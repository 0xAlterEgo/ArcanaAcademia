import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import DiscordUserInfo from "../DiscordUserInfo";
import EthereumWallet from "../ethereum/EthereumWallet";
import Layout from "./Layout";

export default class LinkWalletToDiscord implements View {

    private container: DomNode;

    public discordUser: DiscordUserInfo | undefined;

    constructor() {
        Layout.current.content.append(
            this.container = el(".link-wallet-to-discord-view",
                el(".overlay"),
                el("section",
                    el("header",
                        el("img", { src: "/images/logo/arcana-academia.png", alt: "Arcana Academia" }),
                    ),
                    el("article",
                        el("h1", "WELCOME TO CAMPUS"),
                        el("a.discord-login-button", "SIGN TO REGISTER", {
                            href: "https://discord.com/oauth2/authorize?client_id=984057910688636969&redirect_uri=https%3A%2F%2Farcana.art%2Flink-wallet-to-discord&response_type=code&scope=identify",
                        }),
                    ),
                ),
            ))
        this.checkDiscordLogin();
    }

    private async checkDiscordLogin() {

        let code: string | undefined = new URLSearchParams(window.location.search).get("code")!;
        if (code !== null) {
            try {
                await superagent.get("https://api.0xalterego.com/discord/token").query({
                    code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}/link-wallet-to-discord`,
                });
            } catch (error) {
                console.error(error);
                code = undefined;
            }
        } else {
            code = undefined;
        }

        if (code !== undefined) {
            try {
                const result = await superagent.get("https://api.0xalterego.com/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            } catch (error) {
                console.error(error);
            }
        }
    }

    private async checkWalletConnected(code: string) {
        if (await EthereumWallet.connected() !== true) {
            await EthereumWallet.connect();
        }
        const address = await EthereumWallet.loadAddress();
        if (address !== undefined) {

            const message = "Link Wallet to Discord";
            const signedMessage = await EthereumWallet.signMessage(message);

            try {
                const result = await fetch("https://api.0xalterego.com/link-wallet-to-discord", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert("Link Succeed.");
                } else {
                    alert("Link Failed.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
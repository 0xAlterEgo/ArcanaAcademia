import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Home from "./view/Home";
import LinkWalletToDiscord from "./view/LinkWalletToDiscord";

(async () => {
    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
    SkyRouter.route("link-wallet-to-discord", LinkWalletToDiscord);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
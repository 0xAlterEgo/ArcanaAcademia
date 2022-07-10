
import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(
            this.container = el(".home-view",
                el(".overlay"),
                el(".tweets",
                    el("a.twitter-timeline", {
                        "data-height": "560",
                        href: "https://twitter.com/ArcanaAcademia_nft?ref_src=twsrc%5Etfw",
                    }),
                    el("script", {
                        async: "async",
                        src: "https://platform.twitter.com/widgets.js",
                        charset: "utf-8"
                    }),
                ),
            ).appendTo(BodyNode),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
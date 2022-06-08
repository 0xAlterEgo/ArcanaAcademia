import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import EmblaCarousel from "embla-carousel";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;
    private emblaNode: DomNode;

    constructor() {
        Layout.current.content.append(
            this.container = el(".home-view",
                el(".overlay"),
                el(".tweets",
                    el("a.twitter-timeline", {
                        "data-height": "560",
                        href: "https://twitter.com/0xalterego_nft?ref_src=twsrc%5Etfw",
                    }),
                    el("script", {
                        async: "async",
                        src: "https://platform.twitter.com/widgets.js",
                        charset: "utf-8"
                    }),
                ),
                el(".banner-container",
                    el(".notice-container",
                        this.emblaNode = el(".embla",
                            el(".embla__container",
                                el(".embla__slide",
                                    // el("img", { src: "/images/view/home/mock.png", alt: "mock" })
                                ),
                                el(".embla__slide",
                                    // el("img", { src: "/images/view/home/mock.png", alt: "mock" })
                                ),
                            ),
                        ),
                    ),
                    el(".event-container",
                        el(".embla",
                            el(".embla__container",
                                el(".embla__slide",
                                    // el("img", { src: "/images/view/home/mock.png", alt: "mock" })
                                ),
                                el(".embla__slide",
                                    // el("img", { src: "/images/view/home/mock.png", alt: "mock" })
                                ),
                            ),
                        ),
                    ),
                ),
            ).appendTo(BodyNode),
        );
        this.init();
    }

    private init(): void {
        const options = { loop: true }
        EmblaCarousel(this.emblaNode.domElement, options)
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
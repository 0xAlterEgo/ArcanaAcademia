import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;

        BodyNode.append(
            (this.container = el(".layout",
                el("header",
                    el(".nav",
                        // el("a.logo", { click: () => { ViewUtil.go("/") } },
                        //     el("h1",
                        //         el("img", { src: "/images/logo/arcana-academia.png", alt: "Arcana Academia Logo" }),
                        //     )
                        // ),
                        el("input.menu-btn", { type: "checkbox", id: "menu-btn" }),
                        el("label.menu-icon", { for: "menu-btn" },
                            el("span.navicon")
                        ),
                        el("ul.menu",
                            el("li.item",
                                el("a", { href: "https://discord.gg/ArcanaAcademia", target: "_blank" },
                                    el("img", { src: "/images/logo/discord.png", alt: "discord" }),
                                )
                            ),
                            el("li.item",
                                el("a", { href: "https://twitter.com/Arcana_Academia", target: "_blank" },
                                    el("img", { src: "/images/logo/twitter.svg", alt: "twitter" }),
                                ),
                            ),
                            el("li.item",
                                el("a", { href: "https://fnd.moe/", target: "_blank" },
                                    el("img", { src: "/images/logo/findmoe.png", alt: "find.moe" }),
                                ),
                            ),
                        ),
                    )
                ),
                el("main", (this.content = el(".content"))),
            ))
        );
    }

    public set title(title: string) {
        document.title = `${title} | ArcanaAcademia`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}

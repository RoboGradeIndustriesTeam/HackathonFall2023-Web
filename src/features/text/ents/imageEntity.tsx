import { Entity } from "..";
import {css} from "@emotion/react"

const imgArticle = css`
width: 10%;
`

interface ImageEntityMeta {
  src: string;
}
const ImageEntity: Entity<ImageEntityMeta> = {
  type: "IMAGE",
  render(meta) {
    return <img css={imgArticle} className={"img"} src={meta.src}/>;
  },

  asMarkdown(meta) {
    return `![](${meta.src})`
  },
};

export { ImageEntity };
export type { ImageEntityMeta };

import { Entity } from "..";

interface ImageEntityMeta {
  src: string;
}
const ImageEntity: Entity<ImageEntityMeta> = {
  type: "IMAGE",
  render(meta) {
    return <img src={meta.src}/>;
  },

  asMarkdown(meta) {
    return `![](${meta.src})`
  },
};

export { ImageEntity };
export type { ImageEntityMeta };

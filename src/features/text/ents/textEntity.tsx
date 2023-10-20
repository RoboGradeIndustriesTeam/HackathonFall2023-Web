import { Entity } from "..";

interface TextEntityMeta {
  text: string;
}
const TextEntity: Entity<TextEntityMeta> = {
  type: "TEXT",
  render(meta) {
    return <span>{meta.text}</span>;
  },
  asMarkdown(meta) {
    return `${meta.text}`
  },
};

export { TextEntity };
export type { TextEntityMeta };

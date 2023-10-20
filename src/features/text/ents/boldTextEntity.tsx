import { Entity } from "..";

interface BoldTextEntityMeta {
  text: string;
}
const BoldTextEntity: Entity<BoldTextEntityMeta> = {
  type: "BOLD_TEXT",
  render(meta) {
    return <b>{meta.text}</b>;
  },
  asMarkdown(meta) {
    return `**${meta.text}**`
  },
};

export { BoldTextEntity };
export type { BoldTextEntityMeta };

import { Entity } from "..";

interface LinkEntityMeta {
  text: string;
  href: string;
}
const LinkEntity: Entity<LinkEntityMeta> = {
  type: "LINK",
  render(meta) {
    return <a href={meta.href}>{meta.text}</a>;
  },
  
  asMarkdown(meta) {
    return `[${meta.text}](${meta.href})`
  },
};

export { LinkEntity };
export type { LinkEntityMeta };

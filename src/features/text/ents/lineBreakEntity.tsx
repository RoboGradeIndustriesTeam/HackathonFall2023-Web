import { Entity } from "..";

const LineBreakEntity: Entity<undefined> = {
  type: "LINE_BREAK",
  render(meta) {
    return <br/>;
  },
  asMarkdown(meta) {
    return `\n\n`
  },
};

export { LineBreakEntity };

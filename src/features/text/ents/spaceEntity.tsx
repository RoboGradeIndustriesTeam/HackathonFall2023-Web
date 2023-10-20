import { Entity } from "..";

const SpaceEntity: Entity<undefined> = {
  type: "SPACE",
  render(meta) {
    return <span>&nbsp;</span>;
  },
  asMarkdown(meta) {
    return ` `
  },
};

export { SpaceEntity };

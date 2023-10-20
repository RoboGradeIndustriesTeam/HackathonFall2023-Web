import { BoldTextEntity } from "./ents/boldTextEntity";
import { ImageEntity } from "./ents/imageEntity";
import { LineBreakEntity } from "./ents/lineBreakEntity";
import { LinkEntity } from "./ents/linkEntity";
import { SpaceEntity } from "./ents/spaceEntity";
import { TextEntity } from "./ents/textEntity";
import { Entity, TEXT_TOOLS, ToolType } from "./types";

const Entities: Record<string, Entity<any>> = {
  TEXT: TextEntity,
  BOLD_TEXT: BoldTextEntity,
  IMAGE: ImageEntity,
  LINE_BREAK: LineBreakEntity,
  LINK: LinkEntity,
  SPACE: SpaceEntity,
};

const EntityComponent: React.FC<{ entity: Entity<any>; meta: any }> = (
  { entity, meta },
) => {
  return entity.render(meta);
};

export function entityToMarkdown(data: Array<[Entity<any>, meta: any]>): string {
  let resp = "";
  for (const ent of data) {
    resp += ent[0].asMarkdown(ent[1])
  }
  return resp;
}

export { Entities, EntityComponent, TEXT_TOOLS };
export type { Entity, TextEntity, ToolType };

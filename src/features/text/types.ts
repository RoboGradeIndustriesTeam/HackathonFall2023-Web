export type EntityType = 
  "TEXT" |
  "BOLD_TEXT" |
  "IMAGE" |
  "LINE_BREAK" |
  "SPACE" |
  "LINK";

export interface Entity<T> {
  type: EntityType;
  render: (meta: T) => JSX.Element;
  asMarkdown: (meta: T) => string;
}

export type ToolType = "TEXT" | "BOLD_TEXT" | "LINK" | "LINE_BREAK";
export const TEXT_TOOLS = ["TEXT", "BOLD_TEXT"];
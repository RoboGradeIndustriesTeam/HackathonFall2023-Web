import React from "react";
import {
  Entities,
  EntityComponent,
  TEXT_TOOLS,
  ToolType,
} from "../features/text";
import BlinkingLed from "./BlinkingLed";

export const createTextEditor = () => {
  const [data, setData] = React.useState<Array<any>>([]);
  const [tool, setTool] = React.useState<ToolType>("TEXT");
  return { data, setData, tool, setTool };
};

const TextEditor: React.FC<
  { data: Array<any>; setData: Function; tool: ToolType; setTool: Function }
> = ({ data, setData, tool, setTool }) => {
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (ev) => {
    if (ev.key === " ") {
      setData([
        ...data,
        {
          type: "SPACE",
        },
      ]);
    } else if (TEXT_TOOLS.includes(tool) && ev.key.length === 1) {
      setData([
        ...data,
        {
          type: tool,
          text: ev.key,
        },
      ]);
    } else if (ev.key === "Enter") {
      setData([
        ...data,
        {
          type: "LINE_BREAK",
        },
      ]);
    } else if (ev.key === "Backspace") {
      setData(data.slice(0, data.length - 1));
    }
  };
  return (
    <div
      style={{
        border: "1px solid black",
        padding: 10,
      }}
      onKeyDown={onKeyDown}
      autoFocus={true}
      tabIndex={0}
    >
      {data.map((entity) => (
        <EntityComponent entity={Entities[entity.type]} meta={entity} />
      ))}
      <BlinkingLed/>
    </div>
  );
};

export default TextEditor;

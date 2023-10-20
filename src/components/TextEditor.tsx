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
  const [cursor, setCursor] = React.useState<number>(0);
  return { data, setData, tool, setTool, cursor, setCursor };
};

const TextEditor: React.FC<
  {
    data: Array<any>;
    setData: Function;
    tool: ToolType;
    setTool: Function;
    cursor: number;
    setCursor: Function;
  }
> = ({ data, setData, tool, setTool, cursor, setCursor }) => {
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (ev) => {
    if (data.length === 0) setCursor(0);

    if (ev.key === " ") {
      setData([
        ...data,
        {
          type: "SPACE",
        },
      ]);
    } else if (TEXT_TOOLS.includes(tool) && ev.key.length === 1) {
      if (cursor === 0) {
        setData([{
          type: tool,
          text: ev.key,
        }]);
        setCursor(1);
      } else {
        let nData: any[] = [];
        data.forEach((i, j) => {
          nData.push(i);
          if (cursor === j + 1) {
            nData.push({
              type: tool,
              text: ev.key,
            });
          }
        });
        setData(nData);
      }
    } else if (ev.key === "Enter") {
      setData([
        ...data,
        {
          type: "LINE_BREAK",
        },
      ]);
    } else if (ev.key === "Backspace") {
      let nData: any[] = [];
      data.forEach((i, j) => {
        if (cursor === j + 1) return;
        nData.push(i);
      });
      if (cursor - 1 < 0) setCursor(1);
      else setCursor(cursor - 1);
      setData(nData);
    }
    if (cursor === data.length && ev.key !== "Backspace") {
      setCursor(data.length + 1);
    }
    if (ev.key === "ArrowLeft") {
      console.log(data.length, cursor - 1);
      setCursor(cursor - 1);

      if (cursor - 1 <= 0) {
        setCursor(0);
      }
    } else if (ev.key === "ArrowRight") {
      setCursor(cursor + 1);
      console.log(cursor, cursor + 1, data.length, data.length === cursor + 1);
      if (cursor + 1 > data.length) setCursor(cursor);
    } else if (ev.key === "Delete") {
      let nData: any[] = [];
      data.forEach((i, j) => {
        if (cursor === j) return;
        nData.push(i);
      });
      setCursor(cursor);
      setData(nData);
    }
  };
 
  return (
    <div
      style={{
        border: "1px solid black",
        padding: 10,
        userSelect: "none"
      }}
      onKeyDown={onKeyDown}
      autoFocus={true}
      tabIndex={0}
    >
      {cursor === 0 && <BlinkingLed />}

      {data.map((entity, i) => (
        <span onClick={() => setCursor(i + 1)}>
          <EntityComponent entity={Entities[entity.type]} meta={entity} />
          {(cursor === i + 1 && cursor !== 0 && cursor !== data.length) && (
            <BlinkingLed />
          )}
        </span>
      ))}
      {(cursor === data.length && cursor !== 0) && <BlinkingLed />}
    </div>
  );
};

export default TextEditor;

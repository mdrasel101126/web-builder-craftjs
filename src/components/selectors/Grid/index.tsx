import React from "react";
import { useNode, Element, UserComponent } from "@craftjs/core";
import { Container } from "../Container";
import GridDiv from "../GridDiv";
import { GridSettings } from "./GridSettings";

interface GridProps {
  rows: number;
  columns: number;
  gap: string;
}

const Grid: UserComponent<GridProps> = ({ rows, columns, gap }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref as HTMLDivElement));
        }
      }}
      className={`grid w-full group`}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, minmax(50px, auto))`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
        border: selected ? "1px dashed blue" : "none",
      }}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <Element
          key={index}
          id={`grid-item-${index}`}
          is="div"
          canvas
          className="p-4 group-hover:border border-gray-300 min-h-[100px] h-fit "
        ></Element>
      ))}
    </div>
  );
};

// Export with Craft.js Configuration
Grid.craft = {
  props: {
    rows: 2,
    columns: 2,
    gap: "10px",
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: GridSettings,
  },
};

export default Grid;

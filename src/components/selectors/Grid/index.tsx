import React from "react";
import { useNode, Element, UserComponent } from "@craftjs/core";

interface GridProps {
  rows: number;
  columns: number;
  gap: string;
}

const Grid: UserComponent<GridProps> = ({ rows, columns, gap }) => {
  const {
    connectors: { connect },
    selected,
    actions,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(ref as HTMLDivElement);
        }
      }}
      className={`grid w-full p-2`}
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
        >
          <div className="p-4 border border-gray-300 min-h-[50px] flex items-center justify-center">
            Item {index + 1}
          </div>
        </Element>
      ))}
    </div>
  );
};

// Craft.js Settings Panel
const GridSettings: React.FC = () => {
  const {
    actions: { setProp },
    rows,
    columns,
    gap,
  } = useNode((node) => ({
    rows: node.data.props.rows,
    columns: node.data.props.columns,
    gap: node.data.props.gap,
  }));

  return (
    <div className="p-4">
      <label>Rows</label>
      <input
        type="number"
        value={rows}
        onChange={(e) =>
          setProp((props: any) => (props.rows = Number(e.target.value)))
        }
      />
      <label>Columns</label>
      <input
        type="number"
        value={columns}
        onChange={(e) =>
          setProp((props: any) => (props.columns = Number(e.target.value)))
        }
      />
      <label>Gap</label>
      <input
        type="text"
        value={gap}
        onChange={(e) => setProp((props: any) => (props.gap = e.target.value))}
      />
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
    settings: GridSettings,
  },
};

export default Grid;

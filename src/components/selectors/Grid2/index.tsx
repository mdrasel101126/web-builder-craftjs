import React from "react";
import { useNode, Element, UserComponent } from "@craftjs/core";

export const GridComponent: UserComponent = ({
  children,
  rows,
  columns,
  rowGap,
  columnGap,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${rowGap}px ${columnGap}px`,
        padding: "10px",
        border: "1px dashed #ccc",
        minHeight: "200px",
      }}
    >
      {children || (
        <Element
          id="idx"
          canvas
        />
      )}
    </div>
  );
};

export const GridSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <div>
        <label>Rows:</label>
        <input
          type="number"
          value={props.rows}
          onChange={(e) =>
            setProp((props: any) => (props.rows = parseInt(e.target.value)))
          }
        />
      </div>
      <div>
        <label>Columns:</label>
        <input
          type="number"
          value={props.columns}
          onChange={(e) =>
            setProp((props: any) => (props.columns = parseInt(e.target.value)))
          }
        />
      </div>
      <div>
        <label>Row Gap:</label>
        <input
          type="number"
          value={props.rowGap}
          onChange={(e) =>
            setProp((props: any) => (props.rowGap = parseInt(e.target.value)))
          }
        />
      </div>
      <div>
        <label>Column Gap:</label>
        <input
          type="number"
          value={props.columnGap}
          onChange={(e) =>
            setProp(
              (props: any) => (props.columnGap = parseInt(e.target.value)),
            )
          }
        />
      </div>
    </div>
  );
};

GridComponent.craft = {
  displayName: "Grid",
  props: {
    rows: 3,
    columns: 3,
    rowGap: 10,
    columnGap: 10,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: GridSettings, // We'll define this next
  },
};

export default GridComponent;

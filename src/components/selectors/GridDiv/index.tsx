import { Element, useNode, UserComponent } from "@craftjs/core";
import React from "react";
import { GridDivSettings } from "./GridDivSettings";

const GridDiv: UserComponent = ({ id }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Element
      ref={(node: any) => {
        if (node) {
          connect(node);
        }
      }}
      id={"id-" + id}
      is="Div"
      canvas
      className="p-4 group-hover:border border-gray-300 min-h-[100px] h-fit "
      style={{}}
    />
  );
};

export default GridDiv;

GridDiv.craft = {
  displayName: "Div",
  props: {
    rows: 2,
    columns: 2,
    gap: "10px",
  },
  related: {
    toolbar: GridDivSettings,
  },
};

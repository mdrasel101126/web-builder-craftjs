import { Element, useNode, UserComponent } from "@craftjs/core";
import React from "react";
import { GridDivSettings } from "./GridDivSettings";
import { Container } from "../Container";

interface GridDivProps {
  id: string | number;
}

const GridDiv: UserComponent<GridDivProps> = ({ id }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
      className="p-4 border border-gray-300 min-h-[100px] h-fit"
    >
      <Element
        id={"id-" + id}
        is="div"
        canvas
      />
    </div>
  );
};

export default GridDiv;

GridDiv.craft = {
  displayName: "GridDiv",
  related: {
    toolbar: GridDivSettings,
  },
};

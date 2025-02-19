import { Element, useNode, UserComponent } from "@craftjs/core";
import React from "react";

const GridDiv: UserComponent = ({ id }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Element
      id={"id-" + id}
      is="div"
      canvas
      className="p-4 group-hover:border border-gray-300 min-h-[100px] h-fit "
    />
  );
};

export default GridDiv;

GridDiv.craft = {
  displayName: "Div",
};

import { useNode, UserComponent } from "@craftjs/core";
import React from "react";

const GridDiv: UserComponent = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) {
          drag(ref);
        }
      }}
      className="border-dashed border-gray-500"
    >
      {children}
    </div>
  );
};

export default GridDiv;

GridDiv.craft = {
  displayName: "Div",
};

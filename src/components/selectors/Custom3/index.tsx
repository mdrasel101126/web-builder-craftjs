import { Element, useNode, UserComponent } from "@craftjs/core";
import React, { FC } from "react";

import { Button } from "../Button";
import { Container } from "../Container";

type Custom3BtnDropProps = {
  children?: React.ReactNode;
};

export const Custom3BtnDrop: UserComponent<Custom3BtnDropProps> = ({
  children,
}) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(node) => {
        if (node) {
          connect(node);
        }
      }}
      className="w-full h-full"
    >
      {children}
    </div>
  );
};

Custom3BtnDrop.craft = {
  rules: {
    canMoveOut: (outgoingNodes, self, helpers) => {
      const {
        data: { nodes },
      } = self;

      // Extract all existing button nodes inside this container
      const btnNodes = Object.values(nodes).filter(
        (id) =>
          helpers(id).get().data.type === Button ||
          helpers(id).get().data.type === Button.craft?.displayName,
      );

      // Extract all button nodes attempting to move out
      const outgoingButtonNodes = outgoingNodes.filter(
        (node) =>
          node.data.type === Button ||
          node.data.type === Button.craft?.displayName,
      );

      // Ensure at least one button remains inside
      return outgoingButtonNodes.length < btnNodes.length;
    },
  },
};

export const Custom3: UserComponent = (props) => {
  return (
    <Container
      {...props}
      className="overflow-hidden"
    >
      <div className="w-full mb-4">
        <h2 className="text-center text-xs text-white">
          I must have at least 1 button
        </h2>
      </div>
      <Element
        canvas
        is={Custom3BtnDrop}
        id="wow"
      >
        <Button background="bg-gray-300" />
      </Element>
    </Container>
  );
};

Custom3.craft = {
  ...Container.craft,
  displayName: "Custom 3",
};

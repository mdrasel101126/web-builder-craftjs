import { Element, useNode, UserComponent } from "@craftjs/core";
import React, { FC } from "react";

import { Container } from "../Container";
import { Video } from "../Video";

type Custom2VideoDropProps = {
  children?: React.ReactNode;
};

export const Custom2VideoDrop: UserComponent<Custom2VideoDropProps> = ({
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
      className="flex-1 ml-5 h-full"
    >
      {children}
    </div>
  );
};

Custom2VideoDrop.craft = {
  rules: {
    canMoveIn: (nodes, self, helper) => {
      return (
        nodes.every(
          (node) =>
            node.data.type === Video ||
            node.data.type === Video.craft?.displayName,
        ) && helper(self.id).descendants().length === 0
      );
    },
  },
};

export const Custom2: UserComponent = (props) => {
  return (
    <Container
      {...props}
      className="overflow-hidden"
    >
      <div className="w-24">
        <h2 className="text-xs text-white">
          You can only drop
          <br />
          one video here.
        </h2>
      </div>
      <Element
        canvas
        is={Custom2VideoDrop}
        id="wow"
      >
        <Video />
      </Element>
    </Container>
  );
};

Custom2.craft = {
  ...Container.craft,
  displayName: "Custom 2",
};

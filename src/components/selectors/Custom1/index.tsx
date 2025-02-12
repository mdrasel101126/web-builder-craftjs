import { Element, useNode, UserComponent } from "@craftjs/core";
import React, { FC } from "react";

import { Button } from "../Button";
import { Container } from "../Container";

type OnlyButtonsProps = {
  children?: React.ReactNode;
};

export const OnlyButtons: UserComponent<OnlyButtonsProps> = ({
  children,
  ...props
}) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      title="only-buttons"
      ref={(node) => {
        if (node) {
          connect(node);
        }
      }}
      className="w-full mt-5"
      {...props}
    >
      {children}
    </div>
  );
};

OnlyButtons.craft = {
  rules: {
    canMoveIn: (nodes) =>
      nodes.every(
        (node) =>
          node.data.type === Button ||
          node.data.type === Button.craft?.displayName,
      ),
  },
};

export const Custom1: UserComponent = (props) => {
  return (
    <Container {...props}>
      <h2 className="text-lg px-10 py-5 text-white">
        I'm a component that only accepts
        <br /> buttons.
      </h2>
      <Element
        canvas
        id="wow"
        is={OnlyButtons}
      >
        <Button />
        <Button
          buttonStyle="outline"
          color="text-blue-500"
        />
      </Element>
    </Container>
  );
};

Custom1.craft = {
  ...Container.craft,
  displayName: "Custom 1",
};

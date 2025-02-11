/* eslint-disable @typescript-eslint/no-explicit-any */
// components/user/Card.tsx
import React, { ReactNode } from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Element, useNode } from "@craftjs/core";

interface CardTopProps {
  children?: ReactNode;
}
export const CardTop: React.FC<CardTopProps> & { craft: any } = ({
  children,
}) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
      className={cn("flex flex-col gap-2")}
    >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    // Only accept Text components
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((node) => node.data.type === Text),
  },
};

// CardBottom Component (Accepts only Button)
interface CardBottomProps {
  children?: ReactNode;
}
export const CardBottom: React.FC<CardBottomProps> & { craft: any } = ({
  children,
}) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
      className="flex gap-2"
    >
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    // Only accept Button components
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((node) => node.data.type === Button),
  },
};

interface CardProps {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className }) => {
  return (
    <Container className={cn("p-5 bg-white shadow-lg rounded-lg", className)}>
      <Element
        id="text"
        is={CardTop}
        canvas
      >
        <Text
          text="Title"
          className="text-xl font-bold"
        />
        <Text
          text="Subtitle"
          className="text-sm text-gray-600"
        />
      </Element>
      <Element
        id="buttons"
        is={CardBottom}
        canvas
      >
        <Button
          size="sm"
          variant="default"
          className="text-white bg-blue-500 hover:text-blue-500"
        >
          Learn more
        </Button>
      </Element>
    </Container>
  );
};

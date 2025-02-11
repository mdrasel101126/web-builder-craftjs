// components/Toolbox.tsx
import React from "react";
import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Element, useEditor } from "@craftjs/core";
import { Button } from "./Button";
import { Text } from "./Text";
import { Container } from "./Container";
import { Card } from "./Card";

export const Toolbox: React.FC = () => {
  const { connectors, query } = useEditor();
  console.log("query: ", query);
  return (
    <div className={cn("p-4 bg-gray-100 rounded-lg shadow-md")}>
      <div className="mb-3 text-center">
        <p className="text-sm font-medium">Drag to add</p>
      </div>
      <div className="flex flex-col gap-2">
        <ShadButton
          ref={(ref) => {
            if (ref) {
              connectors.create(
                ref,
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-500 text-white hover:text-white"
                >
                  Click me
                </Button>,
              );
            }
          }}
          variant="default"
        >
          Button
        </ShadButton>
        <ShadButton
          ref={(ref) => {
            if (ref) {
              connectors.create(
                ref,
                <Text
                  text="Hi world"
                  className="text-sm text-gray-600"
                />,
              );
            }
          }}
          variant="default"
        >
          Text
        </ShadButton>
        <ShadButton
          ref={(ref) => {
            if (ref) {
              connectors.create(
                ref,
                <Element
                  is={Container}
                  className="p-5"
                  canvas
                />,
              );
            }
          }}
          variant="default"
        >
          Container
        </ShadButton>
        <ShadButton
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <Card />);
            }
          }}
          variant="default"
        >
          Card
        </ShadButton>
      </div>
    </div>
  );
};

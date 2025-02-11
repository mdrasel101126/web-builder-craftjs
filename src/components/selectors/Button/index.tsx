import { useNode, UserComponent } from "@craftjs/core";
import { Button as ShadButton } from "@/components/ui/button"; // ShadCN button
import { cn } from "@/lib/utils"; // Ensure cn is properly imported
import { Text } from "../Text";
import React from "react";

type ButtonProps = {
  background?: string;
  color?: string;
  buttonStyle?: "full" | "outline";
  margin?: string;
  text?: string;
  textComponent?: any;
};

// Define the component as a Craft.js component using UserComponent
export const Button: UserComponent<ButtonProps> = ({
  text,
  textComponent,
  color = "text-gray-900",
  buttonStyle = "full",
  background = "bg-white",
  margin = "m-2",
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <ShadButton
      ref={(node) => {
        if (node) {
          connect(node);
        }
      }} // Ensures ref is applied only when valid
      className={cn(
        "rounded px-4 py-2 w-full",
        background,
        margin,
        buttonStyle === "outline" ? "border border-gray-500" : "shadow-md",
      )}
    >
      <Text
        {...textComponent}
        text={text}
        className={cn(color)}
      />
    </ShadButton>
  );
};

// Attach craft metadata
Button.craft = {
  displayName: "Button",
  props: {
    background: "bg-white",
    color: "text-gray-900",
    buttonStyle: "full",
    text: "Button",
    margin: "m-2",
    textComponent: {
      ...Text.craft.props,
      textAlign: "center",
    },
  },
};

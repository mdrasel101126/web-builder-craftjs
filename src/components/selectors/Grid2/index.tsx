// components/craft/Grid.tsx
import React from "react";
import { useNode } from "@craftjs/core";
import { Card, CardContent } from "@/components/ui/card";
import { GridItem } from "./GridItem";

// Define props type for Grid
interface GridProps {
  columns?: number | { base?: number; sm?: number; md?: number; lg?: number };
  gap?: number;
  children: React.ReactNode;
}

// Define node props shape
interface GridNodeProps {
  columns: number | { base?: number; sm?: number; md?: number; lg?: number };
  gap: number;
}

// Extend FC with Craft.js metadata
interface GridComponent extends React.FC<GridProps> {
  craft: {
    displayName: string;
    props: GridNodeProps;
    rules: {
      canDrag: () => boolean;
      canMoveIn: (incoming: any) => boolean;
    };
  };
}

export const GridTwo = (({ columns = { base: 12 }, gap = 4, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const columnClasses =
    typeof columns === "number"
      ? `grid-cols-${columns}`
      : [
          `grid-cols-${columns.base ?? 12}`,
          columns.sm && `sm:grid-cols-${columns.sm}`,
          columns.md && `md:grid-cols-${columns.md}`,
          columns.lg && `lg:grid-cols-${columns.lg}`,
        ]
          .filter(Boolean)
          .join(" ");

  return (
    <Card
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`grid ${columnClasses} gap-${gap}`}
    >
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}) as GridComponent;

GridTwo.craft = {
  displayName: "Grid",
  props: {
    columns: { base: 12 },
    gap: 4,
  },
  rules: {
    canDrag: () => true,
    canMoveIn: (incoming: any) => incoming.data.type === GridItem,
  },
};

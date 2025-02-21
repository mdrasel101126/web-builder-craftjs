// components/craft/GridItem.tsx
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";

// Define the props type for GridItem
interface GridItemProps {
  span?: number;
  children?: React.ReactNode;
}

// Define the expected node props shape
interface GridItemNodeProps {
  span: number;
}

// Extend the FC type to include Craft.js metadata
interface GridItemComponent extends React.FC<GridItemProps> {
  craft: {
    displayName: string;
    props: GridItemNodeProps;
    rules: {
      canDrag: () => boolean;
      canMoveIn: () => boolean;
    };
  };
}

export const GridItem = (({ span = 4, children }) => {
  const {
    connectors: { connect, drag },
    setProp,
    parentId,
  } = useNode((node) => ({
    parentId: node.data.parent,
  }));

  const { actions, query } = useEditor();

  useEffect(() => {
    if (parentId) {
      const parentNode = query.node(parentId).get();
      const siblings = parentNode.data.nodes || [];
      const accumulatedWidth = siblings
        .map((id: string) => query.node(id).get()?.data.props.span || 0)
        .reduce((a: number, b: number) => a + b, 0);
      const parentColumns = (parentNode.data.props.columns as number) || 12;
      const remainingWidth = parentColumns - accumulatedWidth;

      if (span > remainingWidth) {
        setProp((props: any) => {
          props.span = remainingWidth;
        });
      }
    }
  }, [parentId, span, setProp, query]);

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`col-span-${span} border border-dashed border-gray-300 p-2`}
    >
      {children || <span className="text-gray-500">Grid Item</span>}
    </div>
  );
}) as GridItemComponent;

// Attach Craft.js metadata
GridItem.craft = {
  displayName: "GridItem",
  props: {
    span: 4,
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};

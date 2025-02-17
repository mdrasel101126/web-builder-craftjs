import { useNode } from "@craftjs/core";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const GridSettings = () => {
  const {
    actions: { setProp },
    rows,
    columns,
    gap,
  } = useNode((node) => ({
    rows: node.data.props.rows,
    columns: node.data.props.columns,
    gap: node.data.props.gap,
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Grid Settings
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="rows"
            className="text-sm font-medium text-gray-700"
          >
            Rows
          </Label>
          <Input
            id="rows"
            type="number"
            value={rows}
            onChange={(e) =>
              setProp((props: any) => (props.rows = Number(e.target.value)))
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="columns"
            className="text-sm font-medium text-gray-700"
          >
            Columns
          </Label>
          <Input
            id="columns"
            type="number"
            value={columns}
            onChange={(e) =>
              setProp((props: any) => (props.columns = Number(e.target.value)))
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="gap"
            className="text-sm font-medium text-gray-700"
          >
            Gap
          </Label>
          <Input
            id="gap"
            type="text"
            value={gap}
            onChange={(e) =>
              setProp((props: any) => (props.gap = e.target.value))
            }
            className="w-full"
            placeholder="e.g., 1rem or 10px"
          />
        </div>
      </div>
    </div>
  );
};

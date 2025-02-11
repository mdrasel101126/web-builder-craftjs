import { useEditor } from "@craftjs/core";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return { selected };
  });

  return selected ? (
    <Card className="p-2 h-screen overflow-y-auto">
      <CardContent className="space-y-1 p-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Selected</p>
          <Badge variant="secondary">{selected.name}</Badge>
        </div>
        <Separator />
        {selected.settings && <selected.settings />}
        {selected.isDeletable ? (
          <Button
            variant="secondary"
            color="default"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </Button>
        ) : null}
      </CardContent>
    </Card>
  ) : null;
};

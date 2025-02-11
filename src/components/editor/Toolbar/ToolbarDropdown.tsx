import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ToolbarDropdownProps {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = ({
  title,
  value,
  onChange,
  children,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label>{title}</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
};

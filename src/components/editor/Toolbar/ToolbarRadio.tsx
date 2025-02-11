import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils"; // Assuming you're using `cn` for class merging

interface ToolbarRadioProps {
  value: string;
  label: string;
}

export const ToolbarRadio: React.FC<ToolbarRadioProps> = ({ value, label }) => {
  return (
    <RadioGroup
      defaultValue={value}
      className="flex items-center space-x-2"
    >
      <label
        className="flex items-center space-x-2 text-gray-700 text-sm font-medium cursor-pointer"
        htmlFor={value}
      >
        <RadioGroupItem
          value={value}
          id={value}
          className={cn(
            "w-4 h-4 border border-gray-400 rounded-full transition-all",
            "checked:bg-blue-600 checked:border-transparent checked:ring-2 checked:ring-offset-2 checked:ring-blue-600",
          )}
        />
        <span>{label}</span>
      </label>
    </RadioGroup>
  );
};

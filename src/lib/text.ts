export const capitalize = (text: string) =>
  text ? text[0].toUpperCase() + text.slice(1) : "";

export const weightDescription = (weight: number) => {
  const weightMap: Record<number, string> = {
    400: "Regular",
    500: "Medium",
    700: "Bold",
  };
  return weightMap[weight] || "Regular";
};

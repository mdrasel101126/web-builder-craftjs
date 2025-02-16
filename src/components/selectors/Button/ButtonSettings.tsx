import React from "react";
import { useNode } from "@craftjs/core";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TypographyPanel } from "../Text/TextSettings";

export const ButtonSettings = () => {
  /*   const {
    actions: { setProp },
    background,
    color,
    margin,
    buttonStyle,
  } = useNode((node) => ({
    background: node.data.props.background,
    color: node.data.props.color,
    margin: node.data.props.margin,
    buttonStyle: node.data.props.buttonStyle,
  })); */

  return (
    /*  <div className="space-y-4">
      <Card>
        <CardHeader>
          <h4 className="text-sm font-semibold">Colors</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col space-y-1">
            <Label>Background</Label>
            <Input
              type="color"
              value={background}
              onChange={(e) =>
                setProp((props: any) => (props.background = e.target.value))
              }
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label>Text Color</Label>
            <Input
              type="color"
              value={color}
              onChange={(e) =>
                setProp((props: any) => (props.color = e.target.value))
              }
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h4 className="text-sm font-semibold">Margin</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Top", "Right", "Bottom", "Left"].map((label, index) => (
            <div
              key={index}
              className="flex flex-col space-y-1"
            >
              <Label>{label}</Label>
              <Slider
                value={[margin?.[index] || 0]}
                onValueChange={(value) =>
                  setProp((props: any) => (props.margin[index] = value[0]))
                }
                min={0}
                max={100}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h4 className="text-sm font-semibold">Button Style</h4>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={buttonStyle}
            onValueChange={(value) =>
              setProp((props: any) => (props.buttonStyle = value))
            }
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="full"
                id="full"
              />
              <Label htmlFor="full">Full</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="outline"
                id="outline"
              />
              <Label htmlFor="outline">Outline</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div> */
    <React.Fragment>
      <TypographyPanel />
    </React.Fragment>
  );
};

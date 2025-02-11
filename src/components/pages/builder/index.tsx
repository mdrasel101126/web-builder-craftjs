"use client";

import { Button } from "@/components/user/Button";
import { Card, CardBottom, CardTop } from "@/components/user/Card";
import { Container } from "@/components/user/Container";
import { SettingsPanel } from "@/components/user/SettingsPanel ";
import { Text } from "@/components/user/Text";
import { Toolbox } from "@/components/user/Toolbox";
import { Editor, Frame, Element } from "@craftjs/core";

const Builder = () => {
  return (
    <div className="w-full">
      <Editor
        resolver={{
          Card,
          Button,
          Text,
          CardTop,
          CardBottom,
          Container,
        }}
      >
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <Toolbox />
          </div>
          <div className="col-span-6">
            <Frame>
              <Element
                is={Container}
                canvas
                className="bg-#fff p-5"
              >
                <Card className="bg-#fff p-5" />
                <Button
                  variant="default"
                  className="bg-blue-500 text-white hover:text-blue-500 px-2"
                >
                  Click
                </Button>
                <Text
                  className="text-sm"
                  text="Hi world!"
                />
                <Element
                  is={Container}
                  canvas
                  className="bg-[#999] p-2"
                >
                  <Text
                    className="text-sm"
                    text="It's me again!"
                  />
                </Element>
              </Element>
            </Frame>
          </div>

          <div className="col-span-3">
            <SettingsPanel />
          </div>
        </div>
      </Editor>
    </div>
  );
};

export default Builder;

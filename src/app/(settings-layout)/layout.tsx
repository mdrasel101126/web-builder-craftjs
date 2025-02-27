import Tabs from "@/components/pages/settings/Tabs";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Tabs />
      <main className="">
        <div>{children}</div>
      </main>
    </div>
  );
}

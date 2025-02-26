import Navbar from "@/components/pages/dashboard/Settings/Navbar";
import SettingsSidebar from "@/components/pages/dashboard/Settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SettingsSidebar />
      <main className="flex-1 h-screen overflow-auto">
        <div>
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  );
}

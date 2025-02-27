import { redirect } from "next/navigation";

const SettingsPage = () => {
  return redirect("/settings/general-details");
};

export default SettingsPage;

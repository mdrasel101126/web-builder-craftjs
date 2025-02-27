"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { path: "/community/support/help-center", label: "Help Center" },
  { path: "/community/support/submit-ticket", label: "Submit Ticket" },
  { path: "/community/support/tickets", label: "My Tickets" },
  { path: "/community/support/faq", label: "FAQs" },
  { path: "/community/support/contact-us", label: "Contact Us" },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="grid w-full grid-cols-8 border-b border-gray-300">
      {tabs.map(({ path, label }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            href={path}
            className={`relative px-4 py-2 text-center font-medium transition-all duration-300
              ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500 hover:border-blue-500"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;

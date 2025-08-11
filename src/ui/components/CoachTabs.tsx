"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CoachTabs({ base }: { base: string }) {
  const pathname = usePathname();
  const item = (href: string, label: string) => (
    <Link
      href={href}
      className={
        "text-body font-body px-2 py-1 " +
        (pathname === href ? "font-semibold underline" : "text-default-font")
      }
    >
      {label}
    </Link>
  );

  return (
    <div className="flex w-full items-end">
      <div className="flex h-px w-12 flex-none bg-neutral-200" />
      <div className="ml-4 flex items-center gap-4">
        {item(base, "Dashboard")}
        {item(`${base}/sessions`, "Sessions")}
        {item(`${base}/reviews`, "Reviews")}
      </div>
    </div>
  );
}
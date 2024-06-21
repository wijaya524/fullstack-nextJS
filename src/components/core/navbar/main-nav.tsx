"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
    {
        label: "Banners",
        href: `/${params.storeId}/banners`,
        active: pathname === `/${params.storeId}/banners`,
      },
    {
      label: "Dashboard",
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
    },
    {
      label: "Categories",
      href: `/${params.storeId}/categories`,
      active: pathname === `/${params.storeId}/categories`,
    },
  ];
  return (
    <nav className="flex gap-2" aria-label="Breadcrumb">
      {routes.map((route) => (
        <Link href={route.href} key={route.href}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

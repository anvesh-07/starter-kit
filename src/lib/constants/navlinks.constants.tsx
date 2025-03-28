import { ClipboardList, Code, Settings, ShoppingBag } from "lucide-react";

export const navLinks = [
  {
    title: "New Order",
    icon: ShoppingBag,
    slug: "/dashboard/new-orders",
  },
  {
    title: "Orders",
    icon: ClipboardList,
    slug: "/dashboard/orders",
  },
  {
    title: "Services",
    icon: Settings,
    slug: "/dashboard/services",
  },
  {
    title: "API",
    icon: Code,
    slug: "/dashboard/api",
  },
];

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants/navlinks.constants";
import Logo from "@/components/global/logo";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.slug}>
              <SidebarMenuButton asChild isActive={pathname === item.slug}>
                <Link
                  href={item.slug}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    pathname === item.slug
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback className="bg-accent text-accent-foreground">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

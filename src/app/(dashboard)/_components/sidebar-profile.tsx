"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/better-auth/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SidebarProfile = () => {
  const route = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data, isPending } = useSession();

  return (
    <>
      {!isPending && data && (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="bg-accent text-accent-foreground">
              {data?.user.name.slice(0, 1) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {data?.user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {data?.user.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            disabled={isSigningOut}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => {
              signOut({
                fetchOptions: {
                  onSuccess: () => {
                    route.push("/");
                  },
                  onRequest: () => {
                    setIsSigningOut(true);
                  },
                  onResponse: () => {
                    setIsSigningOut(false);
                  },
                },
              });
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isPending && !data && <ProfileSkeleton />}
    </>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-14 mb-1" />
        <Skeleton className="h-3 w-11" />
      </div>
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );
};

export default SidebarProfile;

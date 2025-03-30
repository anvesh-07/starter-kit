import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Wallet from "./wallet";

export default function Header() {
  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <SidebarTrigger className="block md:hidden" />
        <div className="flex flex-1 items-center justify-between space-x-9 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Wallet />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

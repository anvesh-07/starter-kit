import { P } from "@/components/global/p";
import { Plus } from "lucide-react";

const Wallet = () => {
  return (
    <div className="w-fit h-fit flex items-center justify-center">
      <div className="mr-2">
        <P variant="muted" weight="bold">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(1000)}{" "}
          {/* Replace 1000 with actual balance */}
        </P>
      </div>

      <span className="p-1 bg-primary hover:bg-primary/80 transition-all duration-200 ease-in-out text-background rounded-sm cursor-pointer">
        <Plus className="size-4" />
      </span>
    </div>
  );
};

export default Wallet;

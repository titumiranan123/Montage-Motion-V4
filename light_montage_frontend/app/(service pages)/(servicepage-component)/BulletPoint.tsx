import { CheckCircle2 } from "lucide-react";

export function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 poppins">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none opacity-80" />
      <p className="text-sm md:text-[16px] font-normal leading-6 ">{text}</p>
    </div>
  );
}

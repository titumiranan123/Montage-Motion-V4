import { CheckCircle2 } from "lucide-react";

export function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 poppins">
      <CheckCircle2 size={20} className="mt-0.5 h-5 w-5 flex-none opacity-80" />
      <p className="text-[14px] md:text-[16px] leading-[148%] font-normal  ">
        {text}
      </p>
    </div>
  );
}

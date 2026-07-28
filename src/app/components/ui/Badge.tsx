import { ReactNode } from "react";

type BadgeVariant =
  | "live"
  | "final"
  | "upcoming"
  | "catamarquena"
  | "chacarera"
  | "regional"
  | "neutral";

type Props = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variants: Record<BadgeVariant, string> = {
  live:
    "border-red-500/40 bg-red-500/15 text-red-300",

  final:
    "border-slate-600 bg-slate-800 text-slate-200",

  upcoming:
    "border-[#D6B46A]/40 bg-[#D6B46A]/15 text-[#E5C987]",

  catamarquena:
    "border-[#3F6B3C]/60 bg-[#3F6B3C]/20 text-[#A8C5A5]",

  chacarera:
    "border-[#1E4E79]/60 bg-[#1E4E79]/25 text-[#9CC5E8]",

  regional:
    "border-[#A65E2E]/60 bg-[#A65E2E]/20 text-[#E1A47E]",

  neutral:
    "border-slate-700 bg-slate-900 text-slate-300",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: Props) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full border
        px-3 py-1
        text-xs font-black uppercase tracking-wide
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: Props) {
  const variantes = {
    primary:
      "bg-[#D6B46A] text-slate-950 hover:bg-[#e3c57f]",
    secondary:
      "bg-[#3F6B3C] text-white hover:bg-[#4c7c48]",
    ghost:
      "border border-slate-600 text-[#F5F1E8] hover:bg-slate-800",
  };

  const clases = `
    inline-flex items-center justify-center
    rounded-xl px-5 py-2.5
    font-bold transition
    ${variantes[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={clases}>
      {children}
    </button>
  );
}
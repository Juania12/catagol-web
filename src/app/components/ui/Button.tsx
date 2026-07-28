import Link from "next/link";
import { ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#D6B46A] text-slate-950 hover:bg-[#e4c87f]",

  secondary:
    "bg-[#3F6B3C] text-white hover:bg-[#4f7d4c]",

  outline:
    "border border-slate-700 text-white hover:bg-slate-800",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: Props) {
  const classes = `
    inline-flex
    items-center
    justify-center
    rounded-xl
    px-5
    py-3
    font-bold
    transition
    duration-200
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
}
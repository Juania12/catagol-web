import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border border-slate-700
        bg-slate-900/80
        shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}
import { ReactNode } from "react";

type Props = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  action,
  children,
  className = "",
}: Props) {
  return (
    <section className={className}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-4 mb-4">
          {title && (
            <h2 className="text-xl md:text-2xl font-black text-[#F5F1E8]">
              {title}
            </h2>
          )}

          {action}
        </div>
      )}

      {children}
    </section>
  );
}
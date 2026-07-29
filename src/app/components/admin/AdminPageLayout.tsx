type Props = {
  children: React.ReactNode;
  maxWidth?: "5xl" | "7xl";
};

export default function AdminPageLayout({
  children,
  maxWidth = "7xl",
}: Props) {
  const ancho =
    maxWidth === "5xl"
      ? "max-w-5xl"
      : "max-w-7xl";

  return (
    <main className="min-h-screen bg-[#09110c] text-[#F5F1E8]">
      <div
        className={`mx-auto w-full ${ancho} px-4 py-8 md:px-6`}
      >
        {children}
      </div>
    </main>
  );
}
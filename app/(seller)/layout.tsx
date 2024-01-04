import { Providers } from "@/app/providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <section className="h-screen">{children}</section>;
    </Providers>
  );
}

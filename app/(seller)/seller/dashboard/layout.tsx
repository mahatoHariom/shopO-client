import SellerDashSidebar from "@/components/Seller/SellerDashSIdebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
      <div className="w-[30%] ">
        <SellerDashSidebar />
      </div>

      <section className="h-screen p-10 w-full">{children}</section>
    </div>
  );
}

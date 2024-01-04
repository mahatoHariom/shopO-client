import React from "react";
import { SellerAllProductDataTable } from "./SellerAllProductTable";
import { sellerAllProductColumns } from "./Columns";
import { getClient } from "@/lib/client";
import { GetAllProductsDocument, Product } from "@/graphql/generated/schema";
export const dynamic = "force-dynamic";
const page = async () => {
  const { data } = await getClient().query<{ getAllProducts: Product[] }>({
    query: GetAllProductsDocument,
  });

  return (
    <div>
      <SellerAllProductDataTable
        columns={sellerAllProductColumns}
        data={data?.getAllProducts}
      />
    </div>
  );
};

export default page;

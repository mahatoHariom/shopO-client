/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import DeleteSellerProduct from "@/actions/DeleteSellerProduct";
import {
  Product,
} from "@/graphql/generated/schema";
import { ColumnDef } from "@tanstack/react-table";
export const sellerAllProductColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <>
          <DeleteSellerProduct id={row?.original.id} />
        </>
      );
    },
  },
];

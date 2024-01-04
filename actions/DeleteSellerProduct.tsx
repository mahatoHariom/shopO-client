import {
  DeleteProductDocument,
  GetAllProductsDocument,
} from "@/graphql/generated/schema";
import { useMutation } from "@apollo/client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const DeleteSellerProduct = ({ id }: { id: string }) => {
  const [deleteProduct] = useMutation(DeleteProductDocument, {
    refetchQueries: [{ query: GetAllProductsDocument }],
    onCompleted: () => {
      toast.success("Product deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteSellerProductHandler = async () => {
    await deleteProduct({ variables: { id } });
  };

  return (
    <div>
      <MdDelete onClick={deleteSellerProductHandler} color="red" size="20"/>
    </div>
  );
};

export default DeleteSellerProduct;

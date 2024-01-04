"use client";
import { Button } from "@/components/ui/button";
import {
  CreateProductDocument,
  CreateProductInput,
  GetAllProductsDocument,
  ImageInput,
} from "@/graphql/generated/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import handleImageUploadFunction from "@/actions/handleImageUploadCloudinary";
import { createProductSchema } from "@/validation/product";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
const ProductCreateForm = () => {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  });
  const router = useRouter();
  const [images, setImages] = useState<ImageInput[]>([]);

  const [createProduct, { loading }] = useMutation(CreateProductDocument, {
    refetchQueries: [{ query: GetAllProductsDocument }],
  });
  const handleImageUpload = async (imageFile: any) => {
    try {
      const response = await handleImageUploadFunction(imageFile);
      if (response) {
        const { public_id, secure_url } = response;
        const newImages = [
          ...images,
          { public_id: public_id, imgSrc: secure_url },
        ];
        setImages(newImages);
        form.setValue("images", newImages);
      }
    } catch (error) {
      toast.error("Error Uploading Image to cloudinary");
    }
  };

  const onSubmit: SubmitHandler<CreateProductInput> = async (values) => {
    try {
      const p = await createProduct({
        variables: {
          data: {
            name: values.name,
            category: values.category,
            description: values.description,
            discountPrice: Number(values.discountPrice),
            images: values.images,
            originalPrice: Number(values.originalPrice),
            stock: Number(values.stock),
          },
        },
        onCompleted: () => {
          toast.success("SuccessFully Created Product");
          router.push("/seller/dashboard/all-products");
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-screen-md mx-auto gap-5 h-screen"
        >
          <h1 className="text-3xl font-bold text-center w-full ">
            Create Product
          </h1>

          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} type="text"  className="w-full"/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} type="text" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} type="text" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original price </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Original Price"
                    {...form.register("originalPrice", { valueAsNumber: true })}
                    type="number"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount price </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Discount Price"
                    {...form.register("discountPrice", { valueAsNumber: true })}
                    type="number"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Stock "
                    {...form.register("stock", { valueAsNumber: true })}
                    type="number"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <label className="flex justify-center px-3 py-6 text-sm transition bg-white border border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
            <span className="flex items-center space-x-2">
              <svg className="w-6 h-6 stroke-gray-400" viewBox="0 0 256 256">
                <path
                  d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                ></path>
                <path
                  d="M80,128a80,80,0,1,1,144,48"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                ></path>
                <polyline
                  points="118.1 161.9 152 128 185.9 161.9"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                ></polyline>
                <line
                  x1="152"
                  y1="208"
                  x2="152"
                  y2="128"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                ></line>
              </svg>
              <span className="text-xs font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline">browse</span>
              </span>
            </span>
            <input
              id="photo-dropbox"
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => {
                handleImageUpload(e.target.files && e.target.files[0]);
              }}
            />
          </label>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>

      {images?.map((item, i) => {
        return (
          <div className="flex flex-row w-full gap-2 mt-10" key={i}>
            <div>
              <Image src={item?.imgSrc} width={100} height={100} alt="img" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCreateForm;

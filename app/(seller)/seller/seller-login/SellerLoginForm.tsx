/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  SellerLoginInput,
  useSellerLoginMutation,
} from "@/graphql/generated/schema";
import { sellerLoginSchema } from "@/validation/seller";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BacktoHome from "@/components/BacktoHome";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const SellerLoginForm = () => {
  const form = useForm<SellerLoginInput>({
    resolver: zodResolver(sellerLoginSchema),
  });
  const [sellerLogin, { error, reset }] = useSellerLoginMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<SellerLoginInput> = async (values) => {
    try {
      await sellerLogin({
        variables: {
          email: values?.email,
          password: values?.password,
        },
        onCompleted: () => {
          toast.success("Logged In Success");
          router.replace("/seller/dashboard");
          reset();
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.error("Failed to register:", error);
      reset();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen gap-1 m-auto  ">
        <div className="flex flex-col items-center justify-center  gap-1 m-auto border dark:border-none bg-card p-10 h-[50%] w-[40%] rounded-2xl relative">
          <div className="absolute top-2 left-2 bg-card p-2 border  rounded-full ">
            <BacktoHome />
          </div>
          <Image src={"/logo-3.svg"} alt="shoplogo" height={100} width={100} />
          <h1 className=" text-md text-center ">Login to your shop</h1>
          <Form {...form}>
            <form
              className="w-full m-auto flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
             

              
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
       

              <Button type="submit">Sign In</Button>
              <Link
                href={"/seller/seller-signup"}
                className="flex items-start text-sm hover:text-blue-600 hover:underline"
              >
                Don't have an account ? Create One
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SellerLoginForm;

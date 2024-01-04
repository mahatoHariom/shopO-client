import React from "react";
import {
  Calendar,
  CircleUser,
  ListOrdered,
  MessageCircle,
  Percent,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import LogoutComponent from "./LogoutComponent";
import { ModeToggle } from "../Theme-toggle";


const sidebarData = [
  // {
  //   href: "/",
  //   icon: <ListOrdered size={24} color="#181ecd" />,
  //   text: "All Orders",
  //   color: "blue",
  //   hoverBg: "blue-100",
  // },
  {
    href: "/seller/dashboard/all-products",
    icon: <ShoppingCart size={24} color="#e00000" />,
    text: "All Products",
    color: "red",
    hoverBg: "red-100",
  },
  {
    href: "/seller/dashboard/product/create",
    icon: <ListOrdered color="#07ed17" size={24} />,
    text: "Create Product",
    color: "gray",
    hoverBg: "green-200",
  },
   {
    href: "/",
    icon: <CircleUser size={24} color="#181ecd" />,
    text: "Profile",
    color: "blue",
    hoverBg: "blue-100",
  },
  {
    href: "/",
    icon: <Calendar color="red" size={24} />,
    text: "All Events",
    color: "gray",
    hoverBg: "yellow-200",
  },
  {
    href: "/",
    icon: <MessageCircle color="indigo" size={24} />,
    text: "Message Inbox",
    color: "gray",
    hoverBg: "blue-100",
  },
  {
    href: "/",
    icon: <Percent color="indigo" size={24} />,
    text: "Discount Coupon",
    color: "gray",
    hoverBg: "blue-100",
  },
  {
    href: "/",
    icon: <Settings color="purple" size={24} />,
    text: "Setting",
    color: "gray",
    hoverBg: "blue-100",
  },
];

const SellerDashSidebar = () => {
  return (
    <div className="h-screen p-4 bg-card border dark:border-none dark:bg-slate-900">
      <div className="mb-5 flex gap-2 items-center">
        <h1 className="p-5 text-xl font-bold  ">
          SELLER DASHBOARD
        </h1>
        <div>
        <ModeToggle/>
      </div>
      </div>
      {sidebarData.map((item, index) => (
        <div className="mb-4" key={index}>
          <Link
            href={item.href}
            className={`flex items-center gap-2 p-2 text-${item.color}-500 rounded hover:bg-${item.hoverBg} hover:text-black`}
          >
            {item.icon}
            {item.text}
          </Link>
        </div>
      ))}
      <div className="mb-4">
        <div className="flex items-center gap-2 p-2 text-gray-500 rounded hover:bg-blue-100 hover:text-black">
          <LogoutComponent />
        </div>
      </div>
     
    </div>
  );
};

export default SellerDashSidebar;

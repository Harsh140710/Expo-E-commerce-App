import { UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router";
import { ClipboardListIcon, HomeIcon, PanelLeftIcon, ShoppingBagIcon, UserIcon } from "lucide-react";

export const NavigationLinks = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <HomeIcon className="size-5 font-extrabold" />,
    },
    {
        name: "Products",
        path: "/products",
        icon: <ShoppingBagIcon className="size-5 font-extrabold" />,
    },
    {
        name: "Orders",
        path: "/orders",
        icon: <ClipboardListIcon className="size-5 font-extrabold" />,
    },
    {
        name: "Customers",
        path: "/customers",
        icon: <UserIcon className="size-5 font-extrabold" />,
    },
];

const Navbar = () => {
    const location = useLocation();

    return  (
        <div className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer" className="btn btn-circle btn-ghost" aria-label="open sidebar">
                <PanelLeftIcon className="size-5"/>
            </label>

            <div className="flex-1 px-4">
                <h1 className="text-xl font-bold">
                    {NavigationLinks.find((item) => item.path === location.pathname)?.name || "Dashboard"}
                </h1>
            </div>

            <div className="mr-5">
                <UserButton />
            </div>
        </div>
    )
};

export default Navbar;

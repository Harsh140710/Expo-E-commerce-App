import { useQuery } from "@tanstack/react-query";
import { orderApi, statsApi } from "../lib/api";
import {
    DollarSignIcon,
    IndianRupee,
    PackageIcon,
    ShoppingBagIcon,
    Users2,
} from "lucide-react";
import { capitalizeText, formatDate, getOrderStatusBadge } from "../lib/utils";

const DashboardPage = () => {
    const { data: ordersData, isLoading: ordersLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: orderApi.getAll,
    });
    const { data: statsData, isLoading: statsLoading } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: statsApi.getDashboard,
    });

    // it would be show latest 10 orders
    const recentOrders = ordersData?.orders?.slice(0, 10) || [];
    const stats = [
        {
            name: "Total Revenue",
            value: statsLoading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <IndianRupee className="mt-1 font-extrabold"/>
                    {statsData?.totalRevenue?.toFixed(2) || 0}
                </div>
            ),
            icon: <DollarSignIcon className="size-8" />,
        },
        {
            name: "Total Orders",
            value: statsLoading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                `${statsData?.totalOrders || 0}`
            ),
            icon: <ShoppingBagIcon className="size-8" />,
        },
        {
            name: "Total Customers",
            value: statsLoading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                `${statsData?.totalCustomers || 0}`
            ),
            icon: <Users2 className="size-8" />,
        },
        {
            name: "Total Products",
            value: statsLoading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                `${statsData?.totalProducts || 0}`
            ),
            icon: <PackageIcon className="size-8" />,
        },
    ];

    return (
        <div className="space-y-6">
            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
                {stats.map((e) => (
                    <div key={e.name} className="stat">
                        <div className="stat-figure text-primary">{e.icon}</div>
                        <div className="stat-title">{e.name}</div>
                        <div className="stat-value">{e.value}</div>
                    </div>
                ))}
            </div>

            {/* RECENT ORDERS */}
            <div className="card bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title">Recent Orders</h2>
                    {ordersLoading ? (
                        <div className="flex justify-center py-8">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <div className="text-center py-8 text-base-content/60">
                            No orders yet
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.map((e: any) => (
                                        <tr key={e._id}>
                                            <td>
                                                <span className="font-medium">
                                                    #
                                                    {e._id
                                                        .slice(-8)
                                                        .toUpperCase()}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="font-medium">
                                                    {e.shippingAddress.fullName}
                                                </div>
                                                <div className="text-sm opacity-60">
                                                    {e.orderItems.length}{" "}
                                                    item(s)
                                                </div>
                                            </td>

                                            <td>
                                                <div className="text-sm">
                                                    {e.orderItems[0]?.name}
                                                    {e.orderItems.length > 1 &&
                                                        ` +${
                                                            e.orderItems
                                                                .length - 1
                                                        } more`}
                                                </div>
                                            </td>

                                            <td>
                                                <span className="font-medium">
                                                    <IndianRupee />{e.totalPrice.toFixed(2)}
                                                </span>
                                            </td>

                                            <td>
                                                <div
                                                    className={`badge ${getOrderStatusBadge(
                                                        e.status,
                                                    )}`}
                                                >
                                                    {capitalizeText(e.status)}
                                                </div>
                                            </td>

                                            <td>
                                                <span className="text-sm opacity-60">
                                                    {formatDate(e.createdAt)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

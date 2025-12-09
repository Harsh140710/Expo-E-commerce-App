import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import DashboardLayout from "./layout/DashboardLayout";
import PageLoader from "./components/PageLoader";
import { useAxiosInterceptor } from "./hook/useAxiosInterpretor";

const App = () => {
    const { isSignedIn, isLoaded, getToken } = useAuth();
    console.log(getToken());
    useAxiosInterceptor();
    if (!isLoaded) return <PageLoader />;

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />
                }
            />
            <Route
                path="/"
                element={
                    isSignedIn ? (
                        <DashboardLayout />
                    ) : (
                        <Navigate to={"/login"} />
                    )
                }
            >
                <Route index element={<Navigate to={"dashboard"} />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="customers" element={<CustomerPage />} />
            </Route>
        </Routes>
    );
};

export default App;

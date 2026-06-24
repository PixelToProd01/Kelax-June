import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";

const CustomerLayout = () => {

  return (
    <div className="flex min-h-screen">
      {/* <UserSidebar /> */}
      <CustomerSidebar />

      <div className="flex-1 bg-gray-100">
        {/* <UserHeader /> */}
        <CustomerHeader />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;

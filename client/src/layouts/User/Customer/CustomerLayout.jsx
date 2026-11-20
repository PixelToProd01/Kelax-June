import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";

const CustomerLayout = () => {

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* <UserSidebar /> */}
      <CustomerSidebar />

      <div className="flex flex-col flex-1">
        {/* <UserHeader /> */}
        <CustomerHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;

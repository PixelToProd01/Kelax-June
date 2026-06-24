import { Outlet } from "react-router-dom";
import PartnerSidebar from "./PartnerSidebar";
import PartnerHeader from "./PartnerHeader";
// import UserSidebar from "./PartnerSidebar";
// import UserHeader from "./PartnerHeader";

const PartnerLayout = () => {

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* <UserSidebar /> */}
      <PartnerSidebar />

      <div className="flex flex-col flex-1">
        {/* <UserHeader /> */}
        <PartnerHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;

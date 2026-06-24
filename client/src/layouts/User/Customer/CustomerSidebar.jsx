import { NavLink } from "react-router-dom";

const CustomerSidebar = () => {
  return (
    <div style={{ width: "250px", background: "#111", color: "#fff" }}>
      <h2 style={{ padding: "20px" }}>Customer Panel</h2>

      <nav>
        <NavLink to="/customer/dashboard">Dashboard</NavLink>
        <NavLink to="/customer/create-product">Create Product</NavLink>
        <NavLink to="/customer/customers">View Customers</NavLink>
        <NavLink to="/customer/orders">Orders</NavLink>
      </nav>
    </div>
  );
};

export default CustomerSidebar;

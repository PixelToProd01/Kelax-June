import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/admin/customers`,
        {
          withCredentials: true,
        }
      );
      setCustomers(res.data.customers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td className="p-2 border">{c.fullName}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.phone}</td>
              <td className="p-2 border">{c.userStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

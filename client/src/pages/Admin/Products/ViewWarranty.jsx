import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const LIMIT = 20;

const ViewWarranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWarranties = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${serverUrl}/api/warranty/view-warranty`, {
        params: {
          page,
          limit: LIMIT,
        },
        withCredentials: true,
      });

      const data = res.data.warranties || [];

      setWarranties(data);

      setHasMore(data.length === LIMIT);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load warranty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, [page]);

  const deleteWarranty = async (id) => {
    if (!confirm("Delete Warranty?")) return;

    try {
      await axios.delete(`${serverUrl}/api/warranty/delete-warranty/${id}`, {
        withCredentials: true,
      });

      toast.success("Warranty Deleted");

      fetchWarranties();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const statusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";

    if (status === "Expired") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-gray-100 p-3 md:p-2">
      <h1 className="text-2xl font-bold mb-5">Warranty Management</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}

          <div className="hidden md:block bg-white rounded-xl shadow overflow-auto max-h-[60vh]">
            <table
              className="
          min-w-[1000px]
          text-sm
      "
            >
              {/* HEADER */}

              <thead
                className="
          bg-[#006db8]
          text-white
          sticky
          top-0
          z-10
        "
              >
                <tr>
                  <th
                    className="
              px-4 py-3 text-left w-22 border-r border-gray-500
            "
                  >
                    S. No.
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Product Detail
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Customer Detail
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Warranty Timing
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {warranties.map((p, index) => (
                  <tr
                    key={p._id}
                    className="
          border-b
          hover:bg-gray-50
          "
                  >
                    {/* SERIAL */}

                    <td
                      className="
          px-4 py-3 font-semibold text-gray-600 border-r border-gray-500
          "
                    >
                      {(page - 1) * LIMIT + index + 1}
                    </td>

                    {/* PRODUCT */}

                    <td
                      className="
          p-4 space-y-1 border-r border-gray-500
          "
                    >
                      <p className="font-semibold">
                        Serial:
                        <span className="ml-2">{p.serialNumber}</span>
                      </p>

                      <p className="mt-2 text-gray-600">
                        Product:
                        {p.productName}
                      </p>

                      <p className="mt-2 text-gray-600">
                        Warranty:
                        {p.warrantyType}
                      </p>

                      {p.warrantyStatus === "Active" ? (
                        <span
                          className="inline-block
          mt-3
          px-3
          py-1
          rounded-full
          bg-green-100
          text-green-700
          text-xs"
                        >
                          {p.warrantyStatus}
                        </span>
                      ) : (
                        <span
                          className="inline-block
          mt-3
          px-3
          py-1
          rounded-full
          bg-red-100
          text-red-700
          text-xs"
                        >
                          {p.warrantyStatus}
                        </span>
                      )}
                    </td>

                    {/* CUSTOMER */}

                    <td className=" p-4 space-y-1 border-r border-gray-500">
                      <p>
                        <b>Name:</b>
                        {p.customerName}
                      </p>

                      <p className="mt-2">
                        <b>Address:</b>
                        {p.customerAddress}
                      </p>

                      <p className="mt-2">
                        <b>Reseller:</b>
                        {p.resellerName}
                      </p>

                      <p className="mt-2">
                        <b>Config:</b>
                        {p.productConfiguration}
                      </p>
                    </td>

                    {/* TIME */}

                    <td
                      className="
          p-4 space-y-1 border-r border-gray-500
          "
                    >
                      <p>
                        <b>From:</b>

                        {p.validFrom
                          ? new Date(p.validFrom).toLocaleDateString()
                          : "-"}
                      </p>

                      <p className="mt-3">
                        <b>To:</b>

                        {p.validTo
                          ? new Date(p.validTo).toLocaleDateString()
                          : "-"}
                      </p>
                    </td>

                    {/* ACTION */}

                    <td
                      className="
          px-6
          py-5
          "
                    >
                      <button
                        onClick={() => deleteWarranty(p._id)}
                        className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-5
          py-2
          rounded-lg
          cursor-pointer
          "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ================= MOBILE ================= */}

          <div className="grid gap-4 md:hidden">
            {warranties.map((item, index) => (
              <div
                key={item._id}
                className="
bg-white
rounded-xl
shadow
p-4
"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold">{item.productName}</h2>

                    <p className="text-sm text-gray-500">{item.serialNumber}</p>
                  </div>

                  <span
                    className={`
px-2 py-1 rounded-full text-xs
${statusColor(item.warrantyStatus)}
`}
                  >
                    {item.warrantyStatus}
                  </span>
                </div>

                {item.image && (
                  <img
                    src={`${serverUrl}${item.image}`}
                    className="
mt-4
w-full
h-48
object-cover
rounded-xl
"
                  />
                )}

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <b>Customer:</b> {item.customerName}
                  </p>

                  <p>
                    <b>Address:</b> {item.customerAddress}
                  </p>

                  <p>
                    <b>Warranty:</b> {item.warrantyType}
                  </p>

                  <p>
                    <b>From:</b>
                    {new Date(item.validFrom).toLocaleDateString()}
                  </p>

                  <p>
                    <b>To:</b>
                    {new Date(item.validTo).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => deleteWarranty(item._id)}
                    className="
mt-3
bg-red-600
text-white
px-4
py-2
rounded-lg
w-full
"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          <div
            className="
flex
justify-between
items-center
mt-6
bg-white
p-4
rounded-xl
"
          >
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
px-4 py-2
cursor-pointer
border
rounded
disabled:opacity-40
"
            >
              Prev
            </button>

            <span>Page {page}</span>

            <button
              disabled={!hasMore}
              onClick={() => setPage((p) => p + 1)}
              className="
px-4 py-2
cursor-pointer
border
rounded
disabled:opacity-40
"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewWarranty;

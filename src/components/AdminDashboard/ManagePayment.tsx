import { useState, type FormEvent } from "react";
import {
  useGetAllPaymentsQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} from "../../features/api/paymentApi";
import { FiEdit, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";
import type { Payment } from "../../types/types";

export const ManagePayments = () => {
  const { data: payments, isLoading } = useGetAllPaymentsQuery();
  const [updatePayment] = useUpdatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Payment>>({});

  const handleEdit = (payment: Payment) => {
    setEditingId(payment.paymentId);
    setForm({
      paymentStatus: payment.paymentStatus,
      paymentMethod: payment.paymentMethod,
    });
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updatePayment({ id: editingId, data: form });
      setEditingId(null);
      setForm({});
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This payment will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await deletePayment(id);
      Swal.fire("Deleted!", "Payment deleted.", "success");
    }
  };

  if (isLoading) return <p>Loading payments...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Method</th>
            <th>Transaction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.bookingId}</td>
              <td>KES {payment.amount}</td>
              <td>
                {editingId === payment.paymentId ? (
                  <select
                    value={form.paymentStatus}
                    onChange={(e) =>
                      setForm({ ...form, paymentStatus: e.target.value as Payment["paymentStatus"] })
                    }
                    className="select select-bordered select-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                ) : (
                  payment.paymentStatus
                )}
              </td>
              <td>
                {editingId === payment.paymentId ? (
                  <input
                    value={form.paymentMethod}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="input input-sm input-bordered"
                  />
                ) : (
                  payment.paymentMethod
                )}
              </td>
              <td>{payment.transactionId}</td>
              <td className="flex gap-2">
                {editingId === payment.paymentId ? (
                  <button onClick={handleUpdate} className="btn btn-success btn-sm">Save</button>
                ) : (
                  <button onClick={() => handleEdit(payment)} className="btn btn-sm btn-primary">
                    <FiEdit />
                  </button>
                )}
                <button onClick={() => handleDelete(payment.paymentId)} className="btn btn-sm btn-error">
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

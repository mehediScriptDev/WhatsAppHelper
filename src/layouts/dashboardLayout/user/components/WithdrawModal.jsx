import { X } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../../../config/axiosInstance";

export default function WithdrawModal({ isOpen, onClose, bankData }) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    try {
      setIsLoading(true);

      const payload = {
        amountCents: parseInt(withdrawAmount),
        note: notes.trim()
      };

      console.log("Sending payload:", payload);

      const response = await axiosInstance.post(
        "/api/withdrawals/request",
        payload
      );

      console.log({
        amount: withdrawAmount,
        accountName: bankData?.accountHolderName,
        accountNumber: bankData?.accountNumber,
        notes: notes || "No notes provided",
        response: response,
      });

      // Reset form
      setWithdrawAmount("");
      setNotes("");
      onClose();
    } catch (error) {
      console.error("Withdrawal request failed:", error);
      console.error("Error details:", error.response?.data);

      const errorMessage =
        error.response?.data?.details?.[0]?.message ||
        error.response?.data?.error ||
        "Failed to submit withdrawal request";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setWithdrawAmount("");
    setNotes("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Withdraw Request</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Withdraw Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={withdrawAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value)) {
                setWithdrawAmount(value);
              }
            }}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes <span className="text-red-500">*</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes"
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="flex gap-3">
          {/* <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button> */}
          <button
            onClick={handleSendRequest}
            disabled={
              !withdrawAmount || withdrawAmount.trim() === "" || !notes || notes.trim() === "" || isLoading
            }
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#CB3CDF] to-[#B127C1] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

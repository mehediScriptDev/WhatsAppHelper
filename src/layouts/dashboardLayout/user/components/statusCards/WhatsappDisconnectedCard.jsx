import { FaExclamationCircle } from "react-icons/fa";

export default function WhatsappDisconnectedCard() {
  const title = "WHATSAPP DISCONNECTED";
  const value = 6;
  const bgGradient = "from-[#F45B75] to-[#E73257]";

  const bgClass = bgGradient
    ? `bg-gradient-to-br ${bgGradient}`
    : "bg-gray-200";

  return (
    <div
      className={`${bgClass} text-white rounded-lg p-4 sm:p-6 flex items-center justify-between`}
    >
      <div>
        <p className="text-sm xl:text-sm sm:text-sm font-semibold mb-1 sm:mb-2 opacity-90">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl mt-8 sm:mt-12">
          {String(value).padStart(2, "0")}
        </p>
      </div>
      <div className="p-1.5 sm:p-2 bg-white/15 text-white rounded-lg">
        <FaExclamationCircle size={24} className="sm:size-[30px]" />
      </div>
    </div>
  );
}

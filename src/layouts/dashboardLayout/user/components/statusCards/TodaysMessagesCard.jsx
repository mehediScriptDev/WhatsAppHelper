import React from "react";
import { MdOutlineMonetizationOn } from "react-icons/md";

export default function TodaysMessagesCard() {
    const title = "TODAY'S MESSAGES";
    const value = 6;
    const bgGradient = "from-[#F2AC1C] to-[#E28B0E]";

    const bgClass = bgGradient ? `bg-gradient-to-br ${bgGradient}` : 'bg-gray-200';

    return (
        <div className={`${bgClass} text-white rounded-lg p-4 sm:p-6 flex items-center justify-between`}>
            <div>
                <p className="text-sm xl:text-base sm:text-sm font-semibold mb-1 sm:mb-2 opacity-90">{title}</p>
                <p className="text-2xl sm:text-3xl mt-8 sm:mt-12">{String(value).padStart(2, "0")}</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-white/15 text-white rounded-lg">
                <MdOutlineMonetizationOn size={24} className="sm:size-[30px]" />
            </div>
        </div>
    );
}

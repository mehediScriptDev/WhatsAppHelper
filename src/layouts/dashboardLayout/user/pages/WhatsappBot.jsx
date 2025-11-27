
import { IoMdAddCircle } from "react-icons/io";
import TodaysMessagesCard from "../components/statusCards/TodaysMessagesCard";
import ProfileBanner from "../components/ProfileBanner";
import BasicInfoCard from "../components/BasicInfoCard";
import BankInfoCard from "../components/BankInfoCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import WhatsappList from "../components/WhatsappList";
import WhatsappActiveCard from "../components/statusCards/WhatsappActiveCard";
import WhatsappDisconnectedCard from "../components/statusCards/WhatsappDisconnectedCard";
import TodaysBlastCard from "../components/statusCards/TodaysBlastCard";

export default function WhatsappBot() {
  

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-11">
      <div className="">
        {/* Header */}
        <div>
          <div className="flex w-full justify-between">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-[#000000]">
              WhatsApp
            </h1>
            <button className="bg-[#BD31CE] px-2 md:px-4 py-2 text-white rounded-md flex items-center justify-center gap-1 md:gap-2 hover:bg-[#A028B8] transition-colors">
              <span>Add WhatsApp</span>
              <IoMdAddCircle className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[#656565] sm:mb-8 mb-4 text-base md:text-lg lg:text-xl">
            Manage your WhatsApp to receive messages
          </p>
        </div>
        {/* Top yellow banner */}
        <ProfileBanner
          title="Warning"
          text="Do not delete messages that have already been sent. Violations may result in account suspension."
        />
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 my-4 sm:my-8">
          <WhatsappActiveCard />
          <WhatsappDisconnectedCard />
          <TodaysBlastCard />
          <TodaysMessagesCard />
        </div>
        {/* Profile and Settings Sections */}
        <WhatsappList />
      </div>
    </div>
  );
}
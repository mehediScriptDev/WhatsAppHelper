import { ChevronDown, CreditCard } from "lucide-react";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";

import IconWrapper from "./IconWrapper";
import InfoBox from "./InfoBox";
import FormField from "./FormField";

const BankInfoCard = forwardRef(({ userData, onDataChange }, ref) => {
  const [userName, setUserName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");

  // Track original values to detect changes
  const [originalValues, setOriginalValues] = useState({});

  // Update state when userData changes
  useEffect(() => {
    if (userData) {
      console.log(" BankInfoCard received userData:", userData);

    
      const data = userData.data || userData;
      console.log(" Extracted data:", data);

      const bankData = data.bankInfo || data;
      console.log(" Bank data to use:", bankData);

      // Username from bank data
      const displayName = bankData.username || "";
      console.log(" Username to set:", displayName);
      setUserName(displayName);

      // Account Number from bank data
      const accNum = bankData.accountNumber || "";
      setAccountNumber(accNum);

      // Account Holder Name from bank data
      const accHolder = bankData.accountHolderName || "";
      setAccountHolderName(accHolder);

      // Store original values
      setOriginalValues({
        userName: displayName,
        accountNumber: accNum,
        accountHolderName: accHolder
      });

      console.log("💳 BankInfo State updated:", {
        userName: displayName,
        accountNumber: accNum,
        accountHolderName: accHolder
      });
    }
  }, [userData]);

  // Check for changes whenever values change
  useEffect(() => {
    if (Object.keys(originalValues).length > 0) {
      const hasChanges =
        userName !== originalValues.userName ||
        accountNumber !== originalValues.accountNumber ||
        accountHolderName !== originalValues.accountHolderName;

      if (onDataChange) {
        onDataChange(hasChanges);
      }
    }
  }, [userName, accountNumber, accountHolderName, originalValues, onDataChange]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      // Backend expects 'username' (lowercase), not 'userName' (camelCase)
      return {
        username: userName,        // ← Changed from 'userName' to 'username'
        accountNumber,
        accountHolderName,
        bankName: "Trust Bank",
        branch: "Uttara",
        routingNumber: "095123456"
      };
    }
  }));

  return (
    <div className="bg-[#FFFFFF] p-4 md:p-6  shadow-sm mt-4 md:mt-8 rounded-md">
      <div className="flex items-center  gap-4 mb-4 md:mb-6">
        <IconWrapper
          icon={CreditCard}
          bgColor="bg-[#0BA876]"
          textColor="text-white"
        />
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[#000000] mb-2">
            Bank Information
          </h2>
          <p className="text-sm md:text-base text-[#000000]">
            Bank account information for transactions and withdrawals
          </p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <InfoBox heading="Important Information" text="All fields marked with * are required. Complete all bank information to be able to make withdrawals and use payment features." />

        <div>
          <label className="block text-sm md:text-base font-medium text-[#000000] mb-1">
            User Name *
          </label>
          <FormField
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readonly={false}
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            label="Account Number *"
            placeholder="Enter account number"
            note="Enter account number without spaces or hyphens"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <FormField
            label="Account Holder Name *"
            placeholder="Name as per bank account"
            note="The name must be exactly the same as the one on the account"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
        </div>

        {/* <div className="flex justify-end">
          <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Save Bank Info
          </button>
        </div> */}
      </div>
    </div>
  );
});

export default BankInfoCard;

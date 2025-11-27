import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Shield } from "lucide-react";
import axiosInstance from "../../../config/axiosInstance";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Step control: 'email' or 'reset'
  const [step, setStep] = useState("email");

  // Form states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // UI states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Step 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/auth/forgot-password",
        { email: email.trim() }
      );

      console.log("OTP Response:", response);
      console.log("OTP Data:", response.data);

      setMessageType("success");
      setMessage(
        response.data?.message ||
          "OTP has been sent to your email. Please check your inbox."
      );

      // Move to reset password step after 2 seconds
      setTimeout(() => {
        setStep("reset");
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      console.error("Error Response:", error.response);
      setMessageType("error");
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.details ||
        error.message ||
        "Failed to send OTP. Please check your email and try again.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    // Client-side validation
    if (!otp || otp.trim().length === 0) {
      setMessageType("error");
      setMessage("Please enter the OTP sent to your email.");
      return;
    }

    if (newPassword.length < 6) {
      setMessageType("error");
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/auth/reset-password",
        {
          email: email.trim(),
          otp: otp.trim(),
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }
      );

      setMessageType("success");
      setMessage(
        response.data?.message ||
          "Password reset successful! Redirecting to login..."
      );

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset Password Error:", error);
      console.error("Error Response:", error.response);
      setMessageType("error");
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.details ||
        error.message ||
        "Failed to reset password. Please check your OTP and try again.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to email step
  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setMessage("");
  };

  return (
    <div className="bg-gray-100 font-sans">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6 lg:mb-8">
          Bulk Whatsapp
        </h1>

        {/* Card */}
        <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-xl md:rounded-2xl shadow-lg">
          {/* Step 1: Request OTP */}
          {step === "email" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2">
                  Forgot Password?
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Enter your email address and we'll send you an OTP to reset
                  your password.
                </p>
              </div>

              <form onSubmit={handleRequestOTP}>
                {/* Email Field */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-base md:text-lg text-black mb-2 text-left"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="enter your email here"
                      className="w-full px-4 py-3 pl-11 bg-[#F4F4F4] text-black rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#BD31CE]/50 placeholder:text-gray-400"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`mb-4 p-3 rounded-lg border ${
                      messageType === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        messageType === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </p>
                  </div>
                )}

                {/* Send OTP Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-2 md:p-3 px-4 bg-[#BD31CE] text-[#FFFCFC] font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#BD31CE]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#BD31CE] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          )}

          {/* Step 2: Reset Password with OTP */}
          {step === "reset" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2">
                  Reset Password
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Enter the OTP sent to{" "}
                  <span className="font-semibold">{email}</span> and your new
                  password.
                </p>
              </div>

              <form onSubmit={handleResetPassword}>
                {/* OTP Field */}
                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block text-base md:text-lg text-black mb-2 text-left"
                  >
                    OTP Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      id="otp"
                      required
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full px-4 py-3 pl-11 bg-[#F4F4F4] text-black rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#BD31CE]/50 placeholder:text-gray-400"
                    />
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* New Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-base md:text-lg text-black mb-2 text-left"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      id="newPassword"
                      required
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pl-11 bg-[#F4F4F4] text-black rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#BD31CE]/50 placeholder:text-gray-400"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 focus:outline-none"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-5">
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-base md:text-lg text-black mb-2 text-left"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      id="confirmNewPassword"
                      required
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 pl-11 bg-[#F4F4F4] text-black rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#BD31CE]/50 placeholder:text-gray-400"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`mb-4 p-3 rounded-lg border ${
                      messageType === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        messageType === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </p>
                  </div>
                )}

                {/* Reset Password Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-2 md:p-3 px-4 bg-[#BD31CE] text-[#FFFCFC] font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#BD31CE]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>

              {/* Back to Email Step or Resend OTP */}
              <div className="mt-6 text-center space-y-2">
                <button
                  onClick={handleBackToEmail}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#BD31CE] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Email Address
                </button>
                <div className="text-sm text-gray-600">
                  Didn't receive OTP?{" "}
                  <button
                    onClick={() => {
                      handleBackToEmail();
                    }}
                    className="text-[#BD31CE] font-medium hover:underline"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#BD31CE] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

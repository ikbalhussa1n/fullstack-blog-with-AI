import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [photoPreview, set] = useState("");

  const navigate = useNavigate();
  return (
    <div className="max-sm:h-[calc(100dvh-4rem)]  flex items-center justify-center bg-gray-100 px-4 py-10 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 ">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Join us and start blogging.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4 " action="">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={username}
              type="text"
              placeholder="Enter username"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              type="password"
              placeholder="Enter password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              value={avatar}
              type="file"
              className="mt-1 w-full text-sm border rounded-lg p-2 cursor-pointer"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <p
          className="text-center text-sm text-gray-500 mt-6"
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

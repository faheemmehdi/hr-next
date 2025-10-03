"use client";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiMail } from "react-icons/fi";
import { TbLockPassword } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import AuthLayout from "../../components/AuthLayout";
import Link from "next/link";

const desc =
  "Log in to manage employees, monitor attendance, and streamline HR operations efficiently.";

function LoginClient() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Validation function
  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    // Email validation (basic regex)
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Handle input change (update form + clear error if fixed)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error if field is being fixed
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // stop if invalid

    setLoading(true);
    alert("success");
    // try {
    //     // 🔥 Call your API here
    //     const response = await fetch("https://your-api.com/loginClient", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(form),
    //     });

    //     const data = await response.json();
    //     console.log("Login Success:", data);

    //     // TODO: handle login success (redirect, save token, etc.)
    // } catch (err) {
    //     console.error("Login Failed:", err);
    //     // Optionally show a global error
    // } finally {
    //     setLoading(false);
    // }
  };

  return (
    <AuthLayout title="Welcome Back!" desc={desc}>
      <form onSubmit={handleSubmit} className="py-2 px-2 md:px-3">
        <Input
          label="EMAIL ADDRESS OR USERNAME"
          type="email"
          name="email"
          // placeholder="Email"
          value={form.email}
          onChange={handleChange}
          // icon={<FiMail className="h-5 w-5 text-gray-400" />}
          error={errors.email}
          variant="auth"
        />

        <Input
          label="PASSWORD"
          type="password"
          name="password"
          // placeholder="Password"
          value={form.password}
          onChange={handleChange}
          // icon={<TbLockPassword className="h-5 w-5 text-gray-400" />}
          error={errors.password}
          variant="auth"
        />

        <div className="w-full  m-auto flex justify-between text-green-300 text-xxs underline uppercase">
          <Link href="/register" className="hover:text-gray-400">
            No Account? SignUp
          </Link>
          <Link href="/forgot-password" className="hover:text-gray-400">
            Forgot Password?
          </Link>
        </div>
        {/* Button */}
        <div className="w-full mt-2">
          <button
            type="submit"
            className=" w-full h-12 flex text-xxs text-white pb-2 justify-between items-end border-b cursor-pointer hover:text-green-300 border-white"
          >
            <span className="uppercase">sign in</span>
            <FaArrowRightLong />
          </button>
        </div>
        <div className="w-full mt-5">
          <span className="text-center text-xxs text-gray-400 w-full">
            <p>
              By logging in, you agree to our{" "}
              <Link
                href="/terms-n-conditions"
                className="underline text-indigo-200"
              >
                Terms and Conditions
              </Link>
              ,{" "}
              <Link
                href="/terms-n-conditions"
                className="underline text-indigo-200"
              >
                Privary Policy
              </Link>
              , and any applicable guidelines governing the use of this service.
            </p>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginClient;

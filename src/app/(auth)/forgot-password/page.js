"use client";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiMail } from "react-icons/fi";
import AuthLayout from "../../components/AuthLayout";
import Link from "next/link";

const desc = "Enter your account email and we’ll send you a reset link.";

function Forgot() {
  const [form, setForm] = useState({ email: ""});
  const [errors, setErrors] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Validation function
  const validate = () => {
    let valid = true;
    let newErrors = { email: "" };

    // Email validation (basic regex)
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
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
    //     const response = await fetch("https://your-api.com/login", {
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
    <AuthLayout title="Forgot Your Password?" desc={desc}>
      <form onSubmit={handleSubmit} className="py-2  px-3">
        <Input
          label="EMAIL ADDRESS"
          type="email"
          name="email"
          // placeholder="Email"
          value={form.email}
          onChange={handleChange}
          // icon={<FiMail className="h-5 w-5 text-gray-400" />}
          error={errors.email}
          variant="auth"
        />

        {/* Button */}
        <div className="w-full mt-4">
          <Button disabled={loading} width="w-full" variant="gradient">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
      <div className="w-full mb-6">
        <div className="w-11/12  m-auto px-3 flex justify-between text-gray-400 text-xxs">
          <Link href=""></Link>
          <Link href="/login" className="underline text-indigo-200">
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Forgot;

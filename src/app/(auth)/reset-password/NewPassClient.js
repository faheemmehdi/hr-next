"use client";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiMail } from "react-icons/fi";
import { TbLockPassword } from "react-icons/tb";
import AuthLayout from "../../components/AuthLayout";
import Link from "next/link";

const desc = "Create a strong password to secure your HRM account.";

function NewPassClient() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Validation function
  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", confirmPassword: "" };

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

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
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
    alert("Password updated successfully!");
    // try {
    //     const response = await fetch("/api/update-password", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(form),
    //     });
    //     const data = await response.json();
    //     console.log("Update Success:", data);
    // } catch (err) {
    //     console.error("Update Failed:", err);
    // } finally {
    //     setLoading(false);
    // }
  };

  return (
    <AuthLayout title="Set a New Password" desc={desc}>
      <form onSubmit={handleSubmit} className=" px-2">
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

        <Input
          label="CONFIRM PASSWORD"
          type="password"
          name="confirmPassword"
          // placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          // icon={<TbLockPassword className="h-5 w-5 text-gray-400" />}
          error={errors.confirmPassword}
          variant="auth"
        />

        {/* Button */}
        <div className="w-full mt-4">
          <Button disabled={loading} width="w-full" variant="gradient">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>

      <div className="w-full mt-3 mb-1">
        <div className="w-11/12 m-auto px-3 flex justify-between text-gray-400 text-xxs">
          <Link href=""></Link>
          <Link href="/login" className="underline text-indigo-200">
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default NewPassClient;

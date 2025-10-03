"use client";
import { useState } from "react";
import Input from "../../components/Input";
import AuthLayout from "../../components/AuthLayout";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const desc =
  "Create your HRM account to manage employees and streamline all your HR tasks from one platform.";

export default function RegisterClient() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const fields = [
    { label: "FIRST NAME", name: "firstName", type: "text", variant: "auth" },
    { label: "LAST NAME", name: "lastName", type: "text", variant: "auth" },
    { label: "EMAIL", name: "email", type: "email", variant: "auth" },
    { label: "USERNAME", name: "username", type: "text", variant: "auth" },
    { label: "PHONE", name: "phone", type: "tel", variant: "auth" },
    { label: "PASSWORD", name: "password", type: "password", variant: "auth" },
    {
      label: "CONFIRM PASSWORD",
      name: "confirmPassword",
      type: "password",
      variant: "auth",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.username) newErrors.username = "Username is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      alert("Form submitted: " + JSON.stringify(form, null, 2));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome!" desc={desc}>
      <form onSubmit={handleSubmit} className="px-1">
        {/* Loop Inputs */}
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            variant={field.variant}
          />
        ))}

        {/* Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            className="w-full h-11 flex text-xxs text-white pb-2 justify-between items-end border-b cursor-pointer hover:text-green-300 border-white"
          >
            <span className="uppercase">
              {loading ? "Registering..." : "Sign Up"}
            </span>
            <FaArrowRightLong />
          </button>
        </div>

        {/* Links */}
        <div className="w-full mt-3 mb-4">
          <p className="text-center text-xxs text-gray-400">
            By signing up, you agree to our{" "}
            <Link
              href="/terms-n-conditions"
              className="underline text-indigo-200"
            >
              Terms and Conditions
            </Link>
            ,{" "}
            <Link href="/privacy-policy" className="underline text-indigo-200">
              Privacy Policy
            </Link>
            ,and any applicable guidelines governing the use of this service.
          </p>
        </div>

        <div className="w-full mb-1">
          <div className="w-11/12 m-auto px-3 text-xxs flex justify-center text-gray-400">
            <Link href="/login" className="underline text-indigo-200">
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

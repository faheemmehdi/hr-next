"use client";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomSelect from "../../components/CustomSelect";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

let userName = "John Die";
// Grouped steps (easier to expand later)
const stepGroups = [
  {
    title: "Let’s Get Started.",
    description:
      "Just a few quick steps to set up your company and personalize your HRM dashboard",
    steps: [
      {
        title: "Name",
        fields: [
          {
            label: "First Name",
            name: "firstName",
            type: "text",
            variant: "wizard",
          },
          {
            label: "Last Name",
            name: "lastName",
            type: "text",
            variant: "wizard",
          },
        ],
      },
      {
        title: "Location",
        fields: [
          {
            label: "Country",
            name: "userCountry",
            type: "select",
            options: [
              { value: "Pakistan", label: "Pakistan" },
              { value: "India", label: "India" },
              { value: "USA", label: "USA" },
            ],
            variant: "wizard",
          },
          {
            label: "City",
            name: "userCity",
            type: "select",
            options: [
              { value: "Lahore", label: "Lahore" },
              { value: "Karachi", label: "Karachi" },
              { value: "Islamabad", label: "Islamabad" },
            ],
            variant: "wizard",
          },
        ],
      },
    ],
  },
  {
      title: `Hello,${userName}!`,
      description: "Tell Us About the Company",
    steps: [
      {
        title: "Name",
        fields: [
          {
            label: "Company Name",
            name: "companyName",
            type: "text",
            variant: "wizard",
          },
        ],
      },
      {
        title: "Domain",
        fields: [
          {
            label: "Company Domain",
            name: "companyDomain",
            type: "text",
            variant: "wizard",
          },
        ],
      },
      {
        title: "Location",
        fields: [
          {
            label: "Location",
            name: "companyLocation",
            type: "select",
            options: [
              { value: "Pakistan", label: "Pakistan" },
              { value: "India", label: "India" },
              { value: "USA", label: "USA" },
            ],
            variant: "wizard",
          },
        ],
      },
    ],
  },
];

export default function OnBoarding() {
  const [groupIndex, setGroupIndex] = useState(0); // which group
  const [stepIndex, setStepIndex] = useState(0); // which step in group
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userCountry: null,
    companyName: "",
    companyDomain: "",
    companyLocation: null,
  });

  const [errors, setErrors] = useState({});

  const currentGroup = stepGroups[groupIndex];
  const currentStep = currentGroup.steps[stepIndex];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateStep = () => {
    let newErrors = {};
    currentStep.fields?.forEach((field) => {
      if (!form[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.type === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(form[field.name])) {
          newErrors[field.name] = "Invalid email format";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (stepIndex < currentGroup.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // If last step in group → move to next group
      if (groupIndex < stepGroups.length - 1) {
        setGroupIndex(groupIndex + 1);
        setStepIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else if (groupIndex > 0) {
      setGroupIndex(groupIndex - 1);
      setStepIndex(stepGroups[groupIndex - 1].steps.length - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
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
    <div
      className="flex items-center justify-center w-full min-h-screen"
      style={{ backgroundImage: "var(--auth-pages-bg-color)" }}
    >
      <div className="w-11/12 md:w-6/12">
        <div className="w-full auth-card-bg-color border border-gray-600 rounded-lg my-3 px-2 md:px-3 lg:px-5">
          <div className="flex justify-end p-4">
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={140}
              height={140}
              className="h-6 w-20"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="py-3 md:py-5 px-2 md:px-9 lg:px-11"
          >
            {/* Inputs */}
            <div className="w-full px-3 md:px-6">
              {/* Dynamic heading */}
              <h2 className="text-xl md:text-2xl text-white">
                {currentGroup.title}
              </h2>
              <h2 className="text-xxs text-gray-300 mt-2">
                {currentGroup.description} .
              </h2>
              {/* Tabs */}
              <div className="flex mt-4 mb-4">
                {currentGroup.steps.map((s, index) => {
                  const isActive = index === stepIndex;
                  const isCompleted = index < stepIndex;
                  const canClick = isCompleted;

                  return (
                    <span
                      key={index}
                      onClick={() => {
                        if (canClick) setStepIndex(index);
                      }}
                      className={`rounded-lg px-2 py-1 text-xxs mr-2 cursor-pointer transition
                      ${
                        isActive
                          ? "bg-white/10 text-white border border-gray-200 hover:bg-white/30"
                          : isCompleted
                          ? "bg-transparent text-gray-200 border border-gray-300 hover:bg-white/20"
                          : "bg-transparent text-gray-500 border border-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {s.title}
                    </span>
                  );
                })}
              </div>

              {currentStep.fields?.map((field) =>
                field.type === "select" ? (
                  <CustomSelect
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={form[field.name]}
                    onChange={(val) => {
                      setForm({ ...form, [field.name]: val });
                      setErrors({ ...errors, [field.name]: "" });
                    }}
                    options={field.options}
                    placeholder={field.placeholder}
                    error={errors[field.name]}
                    variant={field.variant || "default"}
                  />
                ) : (
                  <Input
                    key={field.name}
                    label={field.label}
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    error={errors[field.name]}
                    icon={field.icon}
                    variant={field.variant || "default"}
                  />
                )
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-3">
              <div
                className="flex items-center text-xxs cursor-pointer text-gray-500"
                title="Back"
              >
                {(stepIndex > 0 || groupIndex > 0) && (
                  <Button
                    type="button"
                    width="w-full"
                    onClick={handlePrev}
                    variant="auth"
                  >
                    <FaArrowLeftLong /> Back
                  </Button>
                )}
              </div>
              <div className="flex items-center text-xxs cursor-pointer text-gray-500">
                {/* If last group and last step → show Submit */}
                {groupIndex === stepGroups.length - 1 &&
                stepIndex === currentGroup.steps.length - 1 ? (
                  <Button type="submit" disabled={loading} variant="auth">
                    {loading ? "Saving..." : "Submit"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    width="w-full"
                    onClick={handleNext}
                    variant="auth"
                  >
                    Next <FaArrowRightLong />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

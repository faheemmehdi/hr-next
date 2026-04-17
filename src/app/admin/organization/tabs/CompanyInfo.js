"use client";
import { useState } from "react";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";
import FileUpload from "y@/app/components/FileUpload";
import { FiBriefcase, FiGlobe, FiMail } from "react-icons/fi";

export default function CompanyInfo() {
  const [companyName, setCompanyName] = useState("Kairos Services");
  const [legalName, setLegalName] = useState("Kairos Services Pvt. Ltd.");
  const [taxId, setTaxId] = useState("NTN-1234567");
  const [registrationNo, setRegistrationNo] = useState("RC-2023-894");

  const [email, setEmail] = useState("info@kairos.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [website, setWebsite] = useState("www.kairos.com");
  const [address, setAddress] = useState("123 Business Avenue");
  const [city, setCity] = useState("Karachi");
  const [country, setCountry] = useState("Pakistan");

  const [logoFile, setLogoFile] = useState("");
  const [attachmentFile, setAttachmentFile] = useState("");

  const resetForm = () => {
    setCompanyName("");
    setLegalName("");
    setTaxId("");
    setRegistrationNo("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setAddress("");
    setCity("");
    setCountry("");
    setLogoFile("");
    setAttachmentFile("");
  };

  const handleSave = () => {
    console.log("Saving company info", {
      companyName,
      legalName,
      taxId,
      registrationNo,
      email,
      phone,
      website,
      address,
      city,
      country,
      logoFile,
      attachmentFile,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Organization</p>
            <FiBriefcase className="text-[#315d9c]" size={13} />
          </div>
          <p className="text-xs font-semibold text-gray-800 mt-1">{companyName || "Not set"}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-[#f7faf8] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Contact Email</p>
            <FiMail className="text-[#2f7d4f]" size={13} />
          </div>
          <p className="text-xs font-semibold text-gray-800 mt-1">{email || "Not set"}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-[#fff8ed] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Website</p>
            <FiGlobe className="text-[#9a5d1d]" size={13} />
          </div>
          <p className="text-xs font-semibold text-gray-800 mt-1">{website || "Not set"}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Company Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            noMargin
          />
          <Input
            label="Legal Name"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            placeholder="Legal entity name"
            noMargin
          />
          <Input
            label="Tax ID / NTN"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            placeholder="Enter tax identification"
            noMargin
          />
          <Input
            label="Registration Number"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
            placeholder="Company registration no."
            noMargin
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Official Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="company@email.com"
            noMargin
          />
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+92 300 1234567"
            noMargin
          />
          <Input
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.company.com"
            noMargin
          />
          <Input
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address"
            noMargin
          />
          <Input
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            noMargin
          />
          <Input
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            noMargin
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Branding & Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FileUpload
            label="Company Logo"
            name="logo"
            onChange={(e) => setLogoFile(e.target.files?.[0])}
            value={logoFile}
          />
          <FileUpload
            label="Attachments"
            name="attachment"
            onChange={(e) => setAttachmentFile(e.target.files?.[0])}
            value={attachmentFile}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="cancel" type="button" onClick={resetForm}>
          Reset
        </Button>
        <Button variant="success" type="button" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

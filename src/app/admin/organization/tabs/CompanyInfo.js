"use client";
import { useState } from "react";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";
import FileUpload from "y@/app/components/FileUpload";

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

  const [attach, setAttach] = useState("");

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
    setAttach("");
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
      attach,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ================= Company Info ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-base font-semibold mb-6 border-b border-gray-300 pb-3">
          Company Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* ================= Contact Info ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-base font-semibold mb-6 border-b border-gray-300 pb-3">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* ================= Branding ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-base font-semibold mb-6 border-b border-gray-300 pb-3">
          Branding & Documents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Company Logo"
            name="logo"
            onChange={(e) => setAttach(e.target.files?.[0])}
            value={attach}
          />

          <FileUpload
            label="Attachments"
            name="attachment"
            onChange={(e) => setAttach(e.target.files?.[0])}
            value={attach}
          />
        </div>
      </div>

      {/* ================= Actions ================= */}
      <div className="flex justify-end gap-4">
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
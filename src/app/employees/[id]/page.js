import EmployeeProfile from "./EmployeeProfile";

export const metadata = {
  title: "Employee Profile | HRM",
};

export default function EmployeeProfilePage({ params }) {
  return <EmployeeProfile employeeId={params?.id} />;
}


import Layout from "../components/Layout";
import PayRoll from "./Payrolls";

export const metadata = {
  title: "Payroll Dashboard | HRM",
};

export default function Profile(){
  return <Layout ><PayRoll /></Layout>;
}
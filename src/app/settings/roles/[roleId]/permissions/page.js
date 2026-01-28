import RoleDetailPermissions from "./SetPermit";
import SetPermit from "./SetPermit";

export const metadata = {
  title: "Set Permissions | HRM",
};

export default function SetPermission({ params }) {

  const { roleId } = params;
  return <RoleDetailPermissions />;
}
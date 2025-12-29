import { ROLE_PERMISSIONS } from "./permissions";
import { useAuthentication } from "./authContext";

export function usePermissions() {
    const { user } = useAuthentication();
    const role = user?.role ?? "edit";

    return ROLE_PERMISSIONS[role];
}
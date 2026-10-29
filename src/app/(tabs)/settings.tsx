// app/(tabs)/settings.tsx
import { useAppSelector } from "../../hooks/hooks";
import { RoleScreenRegistry } from "../../types/navigation";

import { LandlordSettings } from "../../components/roles/landlord/settings";
import { SalesSettings } from "../../components/roles/sales/settings";
import { TenantSettings } from "../../components/roles/tenant/settings";

export default function GenericSettingsScreen() {
  const { currentRole } = useAppSelector((state) => state.role);

  const settingsRegistry: RoleScreenRegistry = {
    tenant: <TenantSettings />,
    landlord: <LandlordSettings />,
    sales: <SalesSettings />,
  };

  if (currentRole === "guest") return null;

  return settingsRegistry[currentRole];
}

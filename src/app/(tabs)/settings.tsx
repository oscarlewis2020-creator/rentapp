// app/(tabs)/settings.tsx
import { useAppSelector } from "../../store/hooks";
import { RoleScreenRegistry } from "../../types/navigation";

import { LandlordSettings } from "../screens/landlord/settings";
import { SalesSettings } from "../screens/sales/settings";
import { TenantSettings } from "../screens/tenant/settings";

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

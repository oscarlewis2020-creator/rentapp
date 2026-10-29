// app/(tabs)/index.tsx
import { useAppSelector } from "../../hooks/hooks";
import { RoleScreenRegistry } from "../../types/navigation";

// Import your custom role-specific content layouts
import { ErrorComponent } from "../../components/global/ErrorComponent";
import { LandlordHome } from "../../components/roles/landlord/home";
import { SalesHome } from "../../components/roles/sales/home";
import { TenantHome } from "../../components/roles/tenant/home";

export default function GenericHomeScreen() {
  const { currentRole } = useAppSelector((state) => state.role);

  // 💡 Define your strict functional view registry map (Omitting guest since they are firewall-blocked)
  const homeRegistry: RoleScreenRegistry = {
    tenant: <TenantHome />,
    landlord: <LandlordHome />,
    sales: <SalesHome />,
  };

  // Fallback structural rendering safety guard
  if (currentRole === "guest") {
    return (
      <ErrorComponent message="Guests are not permitted within this dashboard view." />
    );
  }

  return homeRegistry[currentRole];
}

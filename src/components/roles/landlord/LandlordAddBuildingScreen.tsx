// components/roles/landlord/AddBuildingScreen.tsx
import type { BuildingFormValues } from "./LandlordBuildingFormScreen";
import { BuildingFormScreen } from "./LandlordBuildingFormScreen";

export interface AddBuildingScreenProps {
  onBackPress: () => void;
  onCreateBuilding: (values: BuildingFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function LandlordAddBuildingScreen({
  onBackPress,
  onCreateBuilding,
  isSubmitting = false,
}: AddBuildingScreenProps) {
  return (
    <BuildingFormScreen
      key="create-building"
      mode="create"
      onBackPress={onBackPress}
      onSubmit={onCreateBuilding}
      isSubmitting={isSubmitting}
    />
  );
}

// // components/roles/landlord/EditBuildingScreen.tsx
import type { BuildingFormValues } from "./LandlordBuildingFormScreen";
import { BuildingFormScreen } from "./LandlordBuildingFormScreen";

export interface EditBuildingScreenProps {
  buildingId: string;
  initialValues: Partial<BuildingFormValues>;
  onBackPress: () => void;
  onUpdateBuilding: (
    buildingId: string,
    values: BuildingFormValues,
  ) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function EditBuildingScreen({
  buildingId,
  initialValues,
  onBackPress,
  onUpdateBuilding,
  isSubmitting = false,
}: EditBuildingScreenProps) {
  return (
    <BuildingFormScreen
      key={`edit-${buildingId}`}
      mode="edit"
      initialValues={initialValues}
      onBackPress={onBackPress}
      onSubmit={(values) => onUpdateBuilding(buildingId, values)}
      isSubmitting={isSubmitting}
    />
  );
}

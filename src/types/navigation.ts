// types/navigation.ts

export type UserRole = "landlord" | "tenant" | "sales";

export interface WorkspaceData {
  id: string;
  title: string;
  badgeCount?: number;
}

// Layout Registry mapping forces components to follow explicit contracts
export type RoleScreenRegistry = Record<UserRole, React.ReactElement>;

export interface RoleContextType {
  currentRole: UserRole | "guest";
  setCurrentRole: (role: UserRole | "guest") => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

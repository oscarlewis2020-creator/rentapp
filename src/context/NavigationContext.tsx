import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BackHandler, Platform } from "react-native";

export type DashboardState =
  | "base"
  | "permissions"
  | "wallets"
  | "wallet_details"
  | "inventory"
  | "building_details"
  | "building_tenants"
  | "building_settings"
  | "statement_verification"
  | "bulk_sms"
  | "sms_details"
  | "purchase_tokens"
  | "search_tenant"
  | "analytics"
  | "unit_performance"
  | "notification"
  | "add_building"
  | "add_unit"
  | "apply_lease"
  | "edit_unit"
  | "unit_details";

interface NavigationContextType {
  currentSubDashboard: DashboardState;
  selectedBuildingName: string;
  selectedUnitName: string;
  navigateToSubDashboard: (nextState: DashboardState) => void;
  navigateBack: () => void;
  updateBuildingName: (name: string) => void;
  updateUnitName: (name: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

const TRANSIENT_VIEWS: DashboardState[] = [
  "edit_unit",
  "add_unit",
  "apply_lease",
];

export function NavigationProvider({ children }: { children: ReactNode }) {
  // 💡 1. Evaluator: Safely reads the '?view=' parameter from the address bar on Web load
  const getInitialWebState = (): DashboardState => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view") as DashboardState;
      if (viewParam && !TRANSIENT_VIEWS.includes(viewParam)) {
        return viewParam;
      }
    }
    return "base";
  };

  const [currentSubDashboard, setCurrentSubDashboard] =
    useState<DashboardState>(getInitialWebState());
  // 💡 Initialize deep stack reconstruction matrices on load
  const [historyStack, setHistoryStack] = useState<DashboardState[]>(() => {
    const initial = getInitialWebState();
    if (initial === "base") return ["base"];
    // Reconstruct linear branch history trace entries automatically
    if (initial === "unit_performance")
      return ["base", "analytics", "unit_performance"];
    if (initial === "wallet_details")
      return ["base", "wallets", "wallet_details"];
    if (
      initial === "sms_details" ||
      initial === "purchase_tokens" ||
      initial === "search_tenant"
    )
      return ["base", "bulk_sms", initial];
    return ["base", initial];
  });
  const [selectedBuildingName, setSelectedBuildingName] = useState("Dashboard");
  const [selectedUnitName, setSelectedUnitName] = useState("");

  // 💡 2. Navigation Core: Updates state and dynamically writes '?view=' query params to Web address bar
  const navigateToSubDashboard = (nextState: DashboardState) => {
    if (nextState === currentSubDashboard) return;

    // Create an atomic updated stack reference snapshot array
    const nextStack = [...historyStack, nextState];
    setHistoryStack(nextStack);
    setCurrentSubDashboard(nextState);

    if (Platform.OS === "web" && window.history) {
      const url =
        nextState === "base"
          ? window.location.pathname
          : `${window.location.pathname}?view=${nextState}`;

      // 💡 FIXED: Pass the exact nextStack snapshot array into the history object state!
      window.history.pushState(
        { screen: nextState, stack: nextStack },
        "",
        url,
      );
    }
  };

  // 💡 3. Backward Navigation: Pops items and corrects the browser parameter string
  const navigateBack = useCallback(() => {
    setHistoryStack((prevStack) => {
      if (prevStack.length <= 1) return prevStack;

      const updatedStack = [...prevStack];
      updatedStack.pop(); // Clear out current active node trace item
      const targetPreviousState =
        updatedStack[updatedStack.length - 1] || "base";

      setCurrentSubDashboard(targetPreviousState);

      if (Platform.OS === "web" && window.history) {
        const url =
          targetPreviousState === "base"
            ? window.location.pathname
            : `${window.location.pathname}?view=${targetPreviousState}`;
        window.history.pushState(
          { screen: targetPreviousState, stack: updatedStack },
          "",
          url,
        );
      }

      return updatedStack;
    });
  }, []);

  // 💡 4. Synchronization loop for browser hardware Back/Forward buttons and Mobile sensors
  useEffect(() => {
    const handleHardwareBack = () => {
      navigateBack();
      return true;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleHardwareBack,
    );

    const handleWebPopState = (event: PopStateEvent) => {
      // 💡 Restore exact stack footprints from browser system variables
      if (event.state && event.state.stack) {
        setHistoryStack(event.state.stack);
        setCurrentSubDashboard(event.state.screen);
      } else {
        const params = new URLSearchParams(window.location.search);
        const urlView = (params.get("view") as DashboardState) || "base";
        setCurrentSubDashboard(urlView);

        if (urlView === "unit_performance")
          setHistoryStack(["base", "analytics", "unit_performance"]);
        else if (urlView === "base") setHistoryStack(["base"]);
        else setHistoryStack(["base", urlView]);
      }
    };

    if (Platform.OS === "web") {
      window.addEventListener("popstate", handleWebPopState);
    }

    return () => {
      backHandlerSubscription.remove();
      if (Platform.OS === "web") {
        window.removeEventListener("popstate", handleWebPopState);
      }
    };
  }, [navigateBack]);

  const updateBuildingName = (name: string) => {
    setSelectedBuildingName(name);
  };

  const updateUnitName = useCallback((name: string) => {
    setSelectedUnitName(name);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentSubDashboard,
        selectedBuildingName,
        selectedUnitName,
        navigateToSubDashboard,
        navigateBack,
        updateBuildingName,
        updateUnitName,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useGlobalNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useGlobalNavigation must be used within a NavigationProvider",
    );
  }
  return context;
}

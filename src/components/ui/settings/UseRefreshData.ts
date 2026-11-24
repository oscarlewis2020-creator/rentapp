import { useState } from "react";

// TODO: I will replace the body with the real sync once the backend has been implemented. For now, this is just a placeholder to simulate a network request.
async function syncData(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

export function useRefreshData() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);
  const dismissToast = () => setToast(null);

  const handleRefresh = async () => {
    if (refreshing) return; // ignore a second tap while a sync is running
    setDialogVisible(false);
    setRefreshing(true);
    try {
      await syncData();
      setToast("Data synced successfully.");
    } catch (error) {
      console.log("Error syncing data:", error);
      setToast("Couldn't sync your data. Check your connection and try again.");
    } finally {
      setRefreshing(false);
    }
  };

  return {
    dialogVisible,
    refreshing,
    toast,
    openDialog,
    closeDialog,
    dismissToast,
    handleRefresh,
  };
}

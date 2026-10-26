import { PowerSyncBackendConnector } from "@powersync/react-native";
import { universalStorage } from "../store/storage";

export class AppPowerSyncConnector implements PowerSyncBackendConnector {
  // 1. Automatically fetch fresh connection configurations
  async tupleConfig() {
    const token = await universalStorage.getItem("auth_token");
    return {
      endpoint: "https://your-powersync-instance-url.com",
      token: token || "",
    };
  }

  // 2. Used by PowerSync if a token expires during active sync connections
  async fetchCredentials() {
    const token = await universalStorage.getItem("auth_token");
    if (!token) return null;

    return {
      endpoint: "https://your-powersync-instance-url.com",
      token: token,
      userId: "extracted-user-id", // Optional depending on backend
    };
  }

  // 3. Optional: handle uploading offline mutations back to Postgres
  async uploadData(database: any) {
    // Read the local mutation queue and push mutations back to your API
    const transaction = await database.getNextCrudTransaction();
    if (!transaction) return;

    // Process local changes...
  }
}

export const syncConnector = new AppPowerSyncConnector();

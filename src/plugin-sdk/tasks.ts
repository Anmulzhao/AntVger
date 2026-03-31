import { defaultTaskOperationsRuntime } from "../../packages/tasks-host-sdk/src/operations-runtime.js";
import { startTaskRegistryMaintenance } from "../../packages/tasks-host-sdk/src/task-registry.maintenance.js";
import type { OpenClawPluginService } from "../plugins/types.js";

export { defaultTaskOperationsRuntime } from "../../packages/tasks-host-sdk/src/operations-runtime.js";
export {
  findLatestTaskForSessionKeyForCaller,
  findTaskByRunIdForCaller,
  listTasksForSessionKeyForCaller,
} from "../../packages/tasks-host-sdk/src/task-registry.js";
export type {
  TaskDeliveryState,
  TaskNotifyPolicy,
  TaskRecord,
  TaskRuntime,
  TaskStatus,
  TaskTerminalOutcome,
} from "../../packages/tasks-host-sdk/src/task-registry.types.js";

export const defaultOperationsRuntime = defaultTaskOperationsRuntime;

export function createDefaultOperationsMaintenanceService(): OpenClawPluginService {
  return {
    id: "default-operations-maintenance",
    start() {
      startTaskRegistryMaintenance();
    },
  };
}

import { fetchData } from "../lib/api";
import type { DashboardResponse } from "../types/dashboard.types";

async function getStats(): Promise<DashboardResponse> {
  return fetchData<DashboardResponse>("/api/dashboard/stats", {
    method: "GET",
  });
}

export const dashboardService = { getStats };

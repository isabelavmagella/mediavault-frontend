type File = {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  expiryDate: string | null;
  status: "valid" | "expiring" | "expired";
  daysRemaining: number;
}

export type DashboardResponse = {
  totalFiles: number;
  validFiles: number;
  expiringFiles: number;
  expiredFiles: number;
  recentFiles: File[];
};
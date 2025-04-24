export type ReportType = 
  | 'analytics' 
  | 'document' 
  | 'statistics'
  | 'sales'
  | 'users'
  | 'inventory';

export interface RecentReport {
  id: number;
  name: string;
  date: Date;
  type: ReportType;
}
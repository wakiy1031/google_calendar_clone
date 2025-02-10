export interface Event {
  id: string;
  title: string;
  date: Date;
}

export type ViewMode = "month" | "week";

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

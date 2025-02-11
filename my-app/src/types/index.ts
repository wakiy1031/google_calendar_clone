export interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export type ViewMode = "month" | "week";

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
}

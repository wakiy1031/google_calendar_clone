import Calendar from "@/components/calendar/Calendar";
import { UIProvider } from "@yamada-ui/react";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <UIProvider>
        <Calendar />
      </UIProvider>
    </main>
  );
}

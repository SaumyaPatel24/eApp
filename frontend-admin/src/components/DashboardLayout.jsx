import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content Only, no sidebar */}
      <main className="flex flex-col bg-gray-100 min-h-screen">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <span className="font-semibold">Welcome, Admin</span>
        </header>
        <section className="flex-1 p-6">{children}</section>
      </main>
    </div>
  );
}
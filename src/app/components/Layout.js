"use client";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Main */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="pt-13 ml-12 flex-1 p-3 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

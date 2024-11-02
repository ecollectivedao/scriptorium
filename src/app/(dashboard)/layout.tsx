// src/app/(dashboard)/layout.tsx
"use client";
import React from "react";
import NavBar from "../components/nav/NavBar"; // Adjust path if needed

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

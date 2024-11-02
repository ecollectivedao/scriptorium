// src/app/(dashboard)/page.tsx
"use client";
import React from "react";
import Train from "../../components/train/Train";

const TrainingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Train />
    </div>
  );
};

export default TrainingPage;

// src/components/ui/StatCard.tsx
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  className?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, className = "", children }) => {
  return (
    <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-700 mb-1">{title}</h2>
      {children ? (
        children
      ) : (
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      )}
    </div>
  );
};

export default StatCard;


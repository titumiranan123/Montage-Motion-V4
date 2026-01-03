"use client";

import EditableComparisonColumn from "./EditableComparisonColum";

export default function ComparisonPage() {
  const handleSave = (data: any) => {
    console.log("Saved:", data);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <EditableComparisonColumn />
    </div>
  );
}

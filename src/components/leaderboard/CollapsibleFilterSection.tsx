import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Tabs from "./Tabs";
import Filters from "./Filters";

const CollapsibleFilterSection = ({
  activeTab,
  onTabChange,
  onFilterChange,
  availableSubjects,
  activeFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = !!(
    activeFilters.searchTerm ||
    activeFilters.scoreRange ||
    activeFilters.accuracyRange ||
    (activeFilters.subjects && activeFilters.subjects.length > 0)
  );

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.searchTerm) count++;
    if (activeFilters.scoreRange) count++;
    if (activeFilters.accuracyRange) count++;
    if (activeFilters.subjects && activeFilters.subjects.length > 0) count++;
    return count;
  };

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{
        background: "var(--q3-surface-default)",
        borderColor: "var(--q3-stroke-normal)",
      }}
    >
      <div className="lg:flex-[2]">
        <Filters
          onFilterChange={onFilterChange}
          availableSubjects={availableSubjects}
          activeFilters={activeFilters}
        />
      </div>
    </div>
  );
};

export default CollapsibleFilterSection;

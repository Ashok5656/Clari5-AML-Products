import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

interface SortableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  column: string;
  label: string;
  sortConfig?: { key: any; direction: 'asc' | 'desc' } | null;
  onSort: (key: any) => void;
}

export function SortableHeader({ column, label, sortConfig, onSort, className, ...props }: SortableHeaderProps) {
  const isSorted = sortConfig?.key === column;
  const direction = isSorted ? sortConfig.direction : undefined;

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent hover:bg-transparent hover:text-current"
        onClick={() => onSort(column)}
      >
        <span>{label}</span>
        {direction === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : direction === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        )}
      </Button>
    </div>
  );
}

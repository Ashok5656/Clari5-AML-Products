"use client";

import * as React from "react";
import { ChevronDown, Close, Checkmark } from "@carbon/icons-react";
import { cn } from "./utils";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
  label,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  return (
    <div className={cn("flex flex-col gap-2 relative w-full", className)} ref={containerRef}>
      {label && (
        <label className="text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-tight">
          {label}
        </label>
      )}
      <div
        className={cn(
          "bg-white dark:bg-gray-900 border border-[#DDE1E6] dark:border-gray-800 rounded-[4px] min-h-[46px] flex items-center px-3 py-1.5 gap-2 cursor-pointer transition-all",
          isOpen ? "border-[#2A53A0] ring-1 ring-[#2A53A0]" : "hover:border-[#2A53A0]/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap items-center gap-2 flex-1 overflow-hidden">
          {selected.length > 0 ? (
            selected.map((val) => {
              const option = options.find((o) => o.value === val);
              return (
                <div
                  key={val}
                  className="flex items-center gap-1.5 bg-[#F0F5FF] dark:bg-blue-900/20 px-2 py-0.5 rounded-[2px] border border-[#2A53A0]/10"
                >
                  <span className="text-[10px] font-bold text-[#2A53A0] dark:text-blue-400 uppercase tracking-tighter">
                    {option?.label || val}
                  </span>
                  <button
                    onClick={(e) => removeOption(e, val)}
                    className="text-[#2A53A0] hover:text-[#1e3a70] transition-colors"
                  >
                    <Close size={10} />
                  </button>
                </div>
              );
            })
          ) : (
            <span className="text-[14px] text-[#A8ABB0]">{placeholder}</span>
          )}
        </div>
        <div className="h-full flex items-center pl-2 border-l border-[#DDE1E6] ml-1 shrink-0">
          <ChevronDown
            size={16}
            className={cn("text-[#525252] transition-transform", isOpen && "rotate-180")}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-gray-900 border border-[#DDE1E6] dark:border-gray-800 rounded-[4px] shadow-lg z-50 py-1 max-h-[300px] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-colors",
                selected.includes(option.value)
                  ? "bg-[#F0F5FF] text-[#2A53A0] dark:bg-blue-900/30"
                  : "text-[#161616] dark:text-gray-300 hover:bg-[#F4F4F4] dark:hover:bg-gray-800"
              )}
              onClick={() => toggleOption(option.value)}
            >
              <span>{option.label}</span>
              {selected.includes(option.value) && (
                <Checkmark size={14} className="text-[#2A53A0]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

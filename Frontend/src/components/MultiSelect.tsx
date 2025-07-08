
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: (string | number)[];
  selected: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  placeholder: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value: string | number) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleRemove = (value: string | number, event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(selected.filter(item => item !== value));
  };

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange([]);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className="flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {selected.length === 0 ? (
            <span className="text-muted-foreground truncate">{placeholder}</span>
          ) : selected.length <= 3 ? (
            selected.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-1 text-xs font-medium max-w-[150px]"
              >
                <span className="truncate">{item}</span>
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive flex-shrink-0"
                  onClick={(e) => handleRemove(item, e)}
                />
              </span>
            ))
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium">
                {selected.length} items selected
              </span>
              <button
                className="text-xs text-muted-foreground hover:text-destructive ml-2"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform flex-shrink-0 ml-2", 
          isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            {options.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleToggle(option)}
                >
                  <div className="flex h-4 w-4 items-center justify-center">
                    {selected.includes(option) && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <span className="truncate flex-1">{option}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

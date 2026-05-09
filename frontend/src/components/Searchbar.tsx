import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { SearchBarProps } from '../utils/types';

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  onSearch,
  initialValue = "",
  dietaryOptions = [],
  selectedDietaryFilters = [],
  onToggleDietaryFilter,
  onClearDietaryFilters
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showDietaryFilters, setShowDietaryFilters] = useState(false);

  // Update search term if initialValue changes
  useEffect(() => {
    if (initialValue !== searchTerm) {
      setSearchTerm(initialValue);
    }
  }, [initialValue, searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <form className={`relative ${className}`} onSubmit={e => e.preventDefault()}>
      <div className="mx-auto w-full max-w-6xl rounded-[30px] border border-white/70 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div
            className={`flex min-h-[56px] flex-1 items-center gap-3 rounded-full border bg-white px-4 py-3 transition-all duration-300 cursor-text ${
              isFocused
                ? 'border-[#FF5300] shadow-[0_0_0_4px_rgba(255,83,0,0.08)]'
                : 'border-slate-200'
            }`}
          >
            <Search size={20} className="text-slate-400" strokeWidth={1.8} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search food, category, or ingredients..."
              className="min-w-0 flex-1 bg-transparent text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={16} strokeWidth={2} />
              </button>
            )}
          </div>

          {dietaryOptions.length > 0 && (
            <button
              type="button"
              onClick={() => setShowDietaryFilters(!showDietaryFilters)}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#f89b6d] bg-[#FF5300] px-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#f87433] hover:border-[#f85205] cursor-pointer"
            >
              Dietary
            </button>
          )}

          {selectedDietaryFilters.length > 0 && onClearDietaryFilters && (
            <button
              type="button"
              onClick={onClearDietaryFilters}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 px-4 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-slate-200 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {dietaryOptions.length > 0 && showDietaryFilters && (
          <div className="mt-4 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Dietary preferences
              </p>
              <p className="text-xs text-slate-500">
                {selectedDietaryFilters.length > 0
                  ? `${selectedDietaryFilters.length} active`
                  : 'Select filters'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => {
                const isActive = selectedDietaryFilters.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onToggleDietaryFilter?.(option.value)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                      isActive
                        ? 'border-[#FF5300] bg-[#FF5300] text-white shadow-[0_4px_12px_rgba(255,83,0,0.25)]'
                        : 'border-[#FFAE00] bg-[#F3E8CC] text-[#2D2D2D] hover:border-[#FFAE00] hover:bg-[#f0e1bb]'
                    }`}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {selectedDietaryFilters.length > 0 && (
              <p className="text-xs text-slate-500 italic mt-2">
                Showing products matching all selected preferences
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
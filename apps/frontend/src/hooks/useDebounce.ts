"use client";
import { useEffect, useRef, useState } from "react";

type Value = string | boolean;

type UseDebounceArgs<T extends Value> = {
  value: T;
  delay: number;
  onDebouncedChange: (value: T) => void;
};
export function useDebounce<T extends Value>({
  value,
  delay,
  onDebouncedChange,
}: UseDebounceArgs<T>) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceCounter = useRef(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  useEffect(() => {
    debounceCounter.current++;
    const isFirstDebounce = debounceCounter.current === 1;
    if (isFirstDebounce) return;

    onDebouncedChange(debouncedValue);
  }, [debouncedValue]);
}

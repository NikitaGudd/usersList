import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "../store/userStore";
import _ from "lodash";
import { Input } from "@/components/ui/Input";

export const UserSearch: React.FC = () => {
  const { setSearchQuery } = useUserStore();
  const [inputValue, setInputValue] = useState("");

  const debouncedFn = useRef(
    _.debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFn(value);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Пошук за ім'ям або email..."
        value={inputValue}
        onChange={handleSearchChange}
        className="w-full"
      />
    </div>
  );
};

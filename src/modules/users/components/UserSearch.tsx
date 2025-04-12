import React from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useUserStore } from "../store/userStore";

export const UserSearch: React.FC = () => {
  const { searchQuery, setSearchQuery } = useUserStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="mb-4 relative">
      <Input
        type="text"
        placeholder="Пошук за ім'ям або email..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full"
      />
      {searchQuery && (
        <Button
          onClick={clearSearch}
          className="absolute right-0 top-1/2 transform -translate-y-1/2  cursor-pointer"
          aria-label="Очистити пошук"
        >
          <X size={18} />
        </Button>
      )}
    </div>
  );
};

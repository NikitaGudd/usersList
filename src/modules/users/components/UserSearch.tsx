import React from "react";
import { useUserStore } from "../store/userStore";
import { Input } from "../../../components/ui";

export const UserSearch: React.FC = () => {
  const { searchQuery, setSearchQuery } = useUserStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Пошук за ім'ям або email..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full"
      />
    </div>
  );
};

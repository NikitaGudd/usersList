import React from "react";
import { UserList } from "../modules/users";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 border-gray-400 border">
      <h1 className="text-2xl font-bold mb-4">Список користувачів</h1>
      <UserList />
    </div>
  );
};

export default HomePage;

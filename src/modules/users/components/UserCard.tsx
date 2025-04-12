import React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

import { User } from "../types";

interface UserCardProps {
  user: User;
  onViewDetails: (userId: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onViewDetails }) => {
  return (
    <Card className="mb-2 shadow-lg rounded-md">
      <div className="flex items-center justify-between">
        <CardContent className="pt-4">
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </CardContent>
        <CardContent>
          <Button
            onClick={() => onViewDetails(user.id)}
            className="w-[200px] text-black border bg-white-200 hover:bg-gray-300 cursor-pointer mt-5"
          >
            Детальніше
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

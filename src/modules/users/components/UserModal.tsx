import React from "react";

import { useUserDetails } from "../hooks/useUserDetails";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface UserModalProps {
  userId: number;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ userId, onClose }) => {
  const { user, isLoading, error } = useUserDetails(userId);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-md bg-gray-200"
      >
        <DialogHeader>
          <DialogTitle>Деталі користувача</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2
              data-testid="loader"
              className="h-8 w-8 animate-spin text-primary"
            />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">Помилка завантаження: {error}</div>
        ) : user ? (
          <div className="py-4">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <span className="font-medium">Ім'я:</span>
              <span className="col-span-2">{user.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <span className="font-medium">Email:</span>
              <span className="col-span-2">{user.email}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <span className="font-medium">Телефон:</span>
              <span className="col-span-2">{user.phone}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium">Адреса:</span>
              <span className="col-span-2">
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </span>
            </div>
          </div>
        ) : null}

        <DialogFooter>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-300 cursor-pointer"
            onClick={onClose}
          >
            Закрити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

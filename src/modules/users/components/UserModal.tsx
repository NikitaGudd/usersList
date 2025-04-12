import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

import { useUserDetails } from "../hooks/useUserDetails";
import UserField from "./UserField";

interface UserModalProps {
  userId: number;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ userId, onClose }) => {
  const { user, isLoading, error } = useUserDetails(userId);

  const userFields = user
    ? [
        { label: "Ім'я", value: user.name },
        { label: "Email", value: user.email },
        { label: "Телефон", value: user.phone },
        {
          label: "Адреса",
          value: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
        },
      ]
    : [];

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-md bg-gray-200">
        <DialogHeader>
          <DialogTitle>Деталі користувача</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 data-testid="loader" className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">Помилка завантаження.</div>
        ) : user ? (
          <div className="py-4">
            {userFields.map((field, index) => (
              <UserField key={index} label={field.label} value={field.value} />
            ))}
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

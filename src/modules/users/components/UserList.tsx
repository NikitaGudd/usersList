import React, { useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/Alert";

import { useUsers } from "../hooks/useUsers";
import { UserCard } from "./UserCard";
import { UserModal } from "./UserModal";
import { UserSearch } from "./UserSearch";

export const UserList: React.FC = () => {
  const { users, isLoading, error } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleViewDetails = (userId: number) => {
    setSelectedUserId(userId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 data-testid="loader" className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Завантаження користувачів...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>Помилка завантаження.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="shrink-0">
        <UserSearch />
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8">
          <p>Користувачів не знайдено</p>
        </div>
      ) : (
        <div className="grow">
          <AutoSizer>
            {({ height, width }) => (
              <List height={height - 100} itemCount={users.length} itemSize={100} width={width}>
                {({ index, style }) => {
                  const user = users[index];
                  return (
                    <div className="px-4 py-2" style={style} key={user.id}>
                      <UserCard user={user} onViewDetails={handleViewDetails} />
                    </div>
                  );
                }}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
      {selectedUserId && (
        <UserModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  );
};

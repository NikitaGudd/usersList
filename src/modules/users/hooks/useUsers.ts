import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "../api/userApi";
import { useUserStore } from "../store/userStore";

export const useUsers = () => {
  const { setUsers, setLoading, setError, filteredUsers, searchQuery, setSearchQuery } =
    useUserStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
    setLoading(isLoading);
    setError(!!error);

    if (error) {
      console.error("Error when receiving user data:", error);
    }
  }, [data, isLoading, error, setUsers, setLoading, setError]);

  return {
    users: filteredUsers,
    isLoading,
    error: !!error,
    searchQuery,
    setSearchQuery,
  };
};

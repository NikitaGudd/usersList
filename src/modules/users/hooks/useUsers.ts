import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUsers } from "../api/userApi";
import { useUserStore } from "../store/userStore";

export const useUsers = () => {
  const {
    setUsers,
    setLoading,
    setError,
    filteredUsers,
    searchQuery,
    setSearchQuery,
  } = useUserStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
    setLoading(isLoading);
    setError(error ? String(error) : null);
  }, [data, isLoading, error, setUsers, setLoading, setError]);

  return {
    users: filteredUsers,
    isLoading,
    error: error ? String(error) : null,
    searchQuery,
    setSearchQuery,
  };
};

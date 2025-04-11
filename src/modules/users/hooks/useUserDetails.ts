import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUserById } from "../api/userApi";
import { useUserStore } from "../store/userStore";

export const useUserDetails = (userId: number | null) => {
  const { setSelectedUser, setLoading, setError } = useUserStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      userId ? fetchUserById(userId) : Promise.reject("No user ID provided"),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setSelectedUser(data);
    }
    setLoading(isLoading);
    setError(error ? String(error) : null);
  }, [data, isLoading, error, setSelectedUser, setLoading, setError]);

  return {
    user: data,
    isLoading,
    error: error ? String(error) : null,
  };
};

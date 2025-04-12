import { create } from "zustand";

import { User } from "../types";

interface UserState {
  users: User[];
  filteredUsers: User[];
  searchQuery: string;
  loading: boolean;
  error: boolean;
  selectedUser: User | null;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
  filterUsers: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  filteredUsers: [],
  searchQuery: "",
  loading: false,
  error: false,
  selectedUser: null,
  setUsers: (users) => set({ users, filteredUsers: users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterUsers();
  },
  filterUsers: () => {
    const { users, searchQuery } = get();
    const query = searchQuery.toLowerCase();

    const filtered = users.filter(
      (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
    );

    set({ filteredUsers: filtered });
  },
}));

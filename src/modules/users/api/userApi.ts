import axios from "axios";

import { User } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/${id}`);
  return response.data;
};

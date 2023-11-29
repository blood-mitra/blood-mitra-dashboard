import { axios } from "../../lib";
import { useQuery } from "@tanstack/react-query";

interface Payload {
  skip: number;
  take: number;
  bloodGroup: string;
  location: string;
  order: string;
  searchTerm?: string;
}

export interface UsersData {
  data: {
    id: string;
    fullName: string;
    location: string;
    phoneNumber: string;
    bloodGroup: string;
    donatedAt: string;
    createdAt: string;
  }[];
  meta: { page: number; take: number; total: number };
}

export const useUsersData = (payload: Payload) => {
  return useQuery({
    queryKey: [
      "Users",
      payload.skip,
      payload.take,
      payload.bloodGroup,
      payload.location,
      payload.order,
      payload.searchTerm,
    ],
    queryFn: async () =>
      await axios.get<UsersData>("/donors/", {
        params: payload,
      }),
  });
};

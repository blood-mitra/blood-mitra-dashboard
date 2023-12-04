import { axios } from "../../lib";
import { useQuery } from "@tanstack/react-query";

interface Payload {
  dateTo?: string;
  dateFrom?: string;
}

export interface UsersData {
  data: {
    count: string;
  };
}

export const useGetStats = (payload: Payload) => {
  return useQuery({
    queryKey: ["UsersCount", payload.dateFrom, payload.dateTo],
    queryFn: async () =>
      await axios.get<UsersData>("/stats", {
        params: payload,
      }),
  });
};

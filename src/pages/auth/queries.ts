import { useMutation } from "@tanstack/react-query";

import { Auth } from "../../context";

import { axios } from "../../lib";

interface Payload {
  email: string;
  password: string;
}

interface LoginResponse {
  data: Auth;
}

export const useSubmitData = () => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      console.log(payload);
      const { data } = await axios.post<LoginResponse>(
        "/accounts/login",
        payload
      );
      console.log(data);
      return data;
    },
  });
};

import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { AxiosResponse } from "axios";

import { Auth } from "../../context";

import { axios } from "../../lib";

interface Payload {
  email: string;
  password: string;
}

export const useSubmitData = (): UseMutationResult<
  AxiosResponse<Payload>,
  Error,
  Payload
> => {
  return useMutation<AxiosResponse<Payload>, Error, Payload, Auth>({
    mutationFn: async ({ email, password }: Payload) => {
      const response = await axios.post<Payload, AxiosResponse<Payload>>(
        "/accounts/login",
        { email, password }
      );
      return response;
    },
  });
};

import { AxiosResponse } from "axios";

export type ApiResponseError = {
  response: AxiosResponse<string>;
};

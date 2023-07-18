import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-ebon.vercel.app/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("authorization", `${token.toString()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["addNewBook", "bookDetails", "deleteBook", "bookReview"],
  endpoints: () => ({}),
});

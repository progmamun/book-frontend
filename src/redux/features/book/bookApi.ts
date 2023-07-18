/* eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: ({ search, genre, publicationDate }) => ({
        url: "/book/",
        params: { search, genre, publicationDate },
        providesTags: ["addNewBook", "deleteBook"],
      }),
    }),
  }),
});

export const { useGetAllBookQuery } = booksApi;

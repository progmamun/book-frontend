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
    bookDetails: builder.query({
      query: (slug: string) => `/book/${slug}`,
      providesTags: ["bookDetails", "bookReview"],
    }),
  }),
});

export const { useGetAllBookQuery, useBookDetailsQuery } = booksApi;

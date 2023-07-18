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
    createBook: builder.mutation({
      query: (body) => ({
        url: "/book/create-book/",
        method: "POST",
        body,
      }),
    }),
    deleteBook: builder.mutation({
      query: (body) => ({
        url: `book/${body}`,
        method: "DELETE",
      }),
    }),
    updateBook: builder.mutation({
      query: ({ slug, body }) => ({
        url: `books/${slug}`,
        method: "PATCH",
        body,
      }),
    }),
    postReview: builder.mutation({
      query: ({ slug, body }) => ({
        url: `review/${slug}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useBookDetailsQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  usePostReviewMutation,
} = booksApi;

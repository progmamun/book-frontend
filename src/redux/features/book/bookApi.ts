/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/restrict-template-expressions*/

import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: ({ search, genre, publicationYear }) => ({
        url: "/book/",
        params: { search, genre, publicationYear },
        providesTags: ["addNewBook", "deleteBook"],
      }),
    }),
    getRecentBooks: builder.query({
      query: () => ({
        url: "/book/new-books/",
        providesTags: ["addNewBook"],
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
    updateBook: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/book/${slug}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["bookDetails"],
    }),
    deleteBook: builder.mutation({
      query: (body) => ({
        url: `/book/${body}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteBook"],
    }),
    postReview: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/book/review/${slug}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["bookReview"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useGetRecentBooksQuery,
  useBookDetailsQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  usePostReviewMutation,
} = booksApi;

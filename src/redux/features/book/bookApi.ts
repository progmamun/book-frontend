/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/restrict-template-expressions*/
/* eslint-disable @typescript-eslint/no-unsafe-argument*/

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
    getBooks: builder.query({
      query: (params) => {
        const { searchTerm, genre, publicationYear } = params;
        const queryParam = new URLSearchParams();

        if (searchTerm) {
          queryParam.append("searchTerm", searchTerm);
        }

        if (genre) {
          queryParam.append("genre", genre);
        }

        /*if (publicationDate) {
          // Convert the publicationDate to the format "YYYY-MM-DD"
          // const formattedDate = new Date(publicationDate)
          //   .toISOString()
          //   .slice(0, 10);
          // queryParam.append("publicationDate", formattedDate);
        }*/
        if (publicationYear) {
          queryParam.append("publicationYear", publicationYear);
        }

        return { url: `/book?${queryParam.toString()}` };
      },
      providesTags: ["Books"],
    }),
    getRecentBooks: builder.query({
      query: () => ({
        url: "/book/new-books/",
      }),
      providesTags: ["addNewBook"],
    }),
    bookDetails: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: ["bookDetails", "bookReview"],
    }),
    createBook: builder.mutation({
      query: (body) => ({
        url: "/book/create-book/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (body) => ({
        url: `/book/${body}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    postReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/book/review/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["bookReview"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useGetBooksQuery,
  useGetRecentBooksQuery,
  useBookDetailsQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  usePostReviewMutation,
} = booksApi;

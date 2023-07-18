/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useGetAllBookQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import { Link } from "react-router-dom";

export default function AllBook() {
  const { data: books, isLoading, isError } = useGetAllBookQuery({});

  useEffect(() => {
    if (isLoading) {
      <p>Loading.. please wait.!</p>;
    }
    if (isError) {
      <p>something went wrong. please try to reload the page.!!</p>;
    }
  }, [isLoading, isError]);
  console.log(books);
  return (
    <>
      <div className="grid grid-cols-3 gap-x-10 gap-y-10">
        {books?.data?.map((book: IBook, i: number) => {
          return (
            <Link key={i} to={`/book-details/${book?.slug}`}>
              <BookCard book={book} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

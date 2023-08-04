/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-argument*/

import { useState } from "react";
import BookCard from "../components/BookCard";
import { IBook } from "../types/globalTypes";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

// eslint-disable-next-line react-refresh/only-export-components
export const genres: string[] = [
  "Fiction",
  "Biography",
  "Historical Fiction",
  "Epic",
  "Fantasy",
  "Young Adult",
  "Mystery",
];

export default function AllBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const {
    data: books,
    isLoading,
    isError,
  } = useGetBooksQuery({
    searchTerm,
    genre,
    publicationYear,
  });

  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenre("");
    setPublicationYear("");
  };

  return (
    <>
      <div className="m-3">
        <>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-success w-full max-w-xs mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-1 btn btn-outline btn-success"
          >
            Search
          </button>

          <div className="mb-3">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="select select-success max-w-xs"
            >
              <option value="">Pick your favorite Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="ml-1 input input-bordered input-info max-w-xs"
              placeholder="Publication Year"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
            />

            <button onClick={handleReset} className="ml-1 btn glass">
              Reset
            </button>
          </div>
        </>

        {isLoading ? (
          <p>Loading.. please wait.!</p>
        ) : isError ? (
          <p>Something went wrong. Please try to reload the page.!!</p>
        ) : (
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {books?.data?.map((book: IBook, i: number) => (
              <Link key={i} to={`/book-details/${book?.id}`}>
                <BookCard book={book} />
              </Link>
            ))}

            {books?.data?.length === 0 && <p>Book Not Found.!</p>}
          </div>
        )}
      </div>
    </>
  );
}

/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
/*eslint-disable @typescript-eslint/no-unsafe-call*/
/*eslint-disable @typescript-eslint/no-unsafe-member-access*/

import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Footer from "../layout/Footer";
import { useGetRecentBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "../components/BookCard";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading, isError } = useGetRecentBooksQuery({});

  useEffect(() => {
    if (isLoading) {
      <p>Loading.. please wait.!</p>;
    }
    if (isError) {
      <p>something went wrong. please try to reload the page.!!</p>;
    }
  }, [isLoading, isError]);

  return (
    <>
      <HeroSection></HeroSection>
      <div className="mt-[20px] mb-[100px]">
        <h3 className="text-[20px] font-[500] text-left mb-[20px]">
          Recently Published Books
        </h3>
        <div className="grid grid-cols-3 gap-x-10 gap-y-10">
          {data?.data?.map((book: IBook, i: number) => {
            return (
              <Link key={i} to={`/book-details/${book.slug}`}>
                <BookCard book={book} />
              </Link>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

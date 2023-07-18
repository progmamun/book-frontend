import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import RecentBookCard from "../components/RecentBookCard";
import Footer from "../layout/Footer";
import { useGetRecentBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "../components/BookCard";

export default function Home() {
  const { data, isLoading, isError } = useGetRecentBooksQuery({});
  console.log(data);

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
              <Link key={i} to={`/details/${book.slug}`}>
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

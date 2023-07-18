import { Link } from "react-router-dom";
import heroBookImg from "../assets/hero-book.jpg";

export default function HeroSection() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${heroBookImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Book Catalog</h1>
            <p className="mb-5">
              “The more that you read, the more things you will know. The more
              that you learn, the more places you’ll go.”
              <em className="block">
                ―Dr. Seuss,{" "}
                <a className="underline decoration-sky-500">
                  I Can Read With My Eyes Shut!
                </a>
              </em>
            </p>
            <Link to="/all-book" className="btn btn-primary">
              View All Book
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

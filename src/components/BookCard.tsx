/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/restrict-template-expressions*/

import moment from "moment";

interface IBook {
  book: {
    _id: string;
    title: string;
    author: string;
    genre: string;
    slug: string;
    publicationDate: string;
    img: string;
  };
}

export default function BookCard({ book }: IBook) {
  return (
    <>
      <div className="card glass mx-2">
        <figure>
          <img className="object-cover h-48" src={`${book.img}`} alt="car!" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Title: {book.title}</h2>
          <p>
            Author: <em>{book.author}</em>
          </p>
          <p>Genre: {book.genre}</p>
          <p>
            Publication Date:
            {moment(book.publicationDate).format("DD MMMM, YYYY")}
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-outline btn-info">View Book</button>
          </div>
        </div>
      </div>
    </>
  );
}

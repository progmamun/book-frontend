import { Link, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../redux/features/book/bookApi";
import moment from "moment";
import { useAppSelector } from "../redux/hook";

export default function BookDetails() {
  const { slug } = useParams();
  const { data, isLoading } = useBookDetailsQuery(slug);

  const user = useAppSelector((state) => state.user);
  console.log(user.id, user.email);

  const handleDelete = () => {
    const sure = confirm("Are you Sure?");
    if (sure) {
      deleteBook(data?.data?.id);
    }
  };

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex gap-3 justify-end">
            {user.email && (
              <Link to="/add-new-book" className="btn btn-primary">
                Add New Book
              </Link>
            )}
            {user?.id === data?.data?.authorId && (
              <div className="flex gap-3">
                <Link className="btn btn-secondary" to={`/update-book/${slug}`}>
                  Edit Book
                </Link>
                <button onClick={handleDelete} className="btn btn-warning">
                  Delete Book
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <figure>
              <img
                className="object-cover"
                src={`${data?.data?.img}`}
                alt="car!"
              />
            </figure>
            <h2 className="card-title">Title: {data?.data?.title}</h2>
            <p>Author: {data?.data?.author}</p>
            <p>Genre: {data?.data?.genre}</p>
            <p>
              Publication Data: {}{" "}
              {moment(data?.data?.publicationDate).format("DD MMMM, YYYY")}
            </p>
            <p>Reviews:</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/restrict-template-expressions*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-floating-promises*/
/* eslint-disable @typescript-eslint/no-unsafe-argument*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useBookDetailsQuery,
  useDeleteBookMutation,
  usePostReviewMutation,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import moment from "moment";

const BookDetails = () => {
  const user = useAppSelector((state) => state.user);

  const [review, setReview] = useState("");
  const { id } = useParams<{ id: any }>();
  const { data, isLoading } = useBookDetailsQuery(id);
  console.log(data, "single book data");

  const [deleteBook, { isSuccess }] = useDeleteBookMutation(data?.data?.id);

  const [postReview] = usePostReviewMutation();
  // console.log(user.accessToken, user.accessToken.email);

  const navigate = useNavigate();

  const handleDelete = () => {
    const sure = confirm("Are you Sure?");
    if (sure) {
      deleteBook(data?.data?.id);
    }
  };

  const postReviewHandle = (e: any) => {
    e.preventDefault();
    postReview({
      id,
      body: {
        email: user.email,
        review,
      },
    });
    setReview("");
  };
  useEffect(() => {
    if (isLoading) {
      <p>Loading...</p>;
    }
    if (isSuccess) {
      toast.success("Book Deleted Successfully");
      navigate("/all-book");
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 flex gap-3 justify-end">
          {user.accessToken && (
            <Link to="/add-new-book" className="btn">
              Add New Book
            </Link>
          )}
          {user.id === data?.data?.authorId && (
            <div className="flex gap-3">
              <Link className="btn btn-secondary" to={`/edit-book/${id}`}>
                Edit Book
              </Link>
              <button onClick={handleDelete} className="btn btn-warning">
                Delete Book
              </button>
            </div>
          )}
        </div>

        <div className="col-span-2 md:col-span-1">
          <img src={data?.data?.img} alt="image" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-semibold">
            Book Title : {data?.data?.title}
          </h2>
          <p>Author Name : {data?.data?.author}</p>
          <p>
            Date Published :
            {moment(data?.data?.publicationDate).format("DD MMMM, YYYY")}
          </p>
          <p>Genre : {data?.data?.genre}</p>
        </div>
        <div className="col-span-2">
          {user.accessToken ? (
            <div>
              <h2 className="text-3xl mb-4">Write a review</h2>
              <form onSubmit={postReviewHandle}>
                <input
                  type="text "
                  value={review}
                  placeholder="Write your review "
                  className="mr-4 p-2 rounded-lg"
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
                <input
                  type="submit"
                  value="Post Review"
                  className="btn btn-primary"
                />
              </form>
            </div>
          ) : (
            <div>
              <p>
                <Link className="btn btn-sm" to="/login">
                  Log In
                </Link>
                to post a review
              </p>
            </div>
          )}
          <h2 className="text-3xl mt-4 font-semibold">Reviews : </h2>
        </div>
        <div className="flex flex-col gap-4">
          {data?.data?.reviews ? (
            data?.data?.reviews.map((review: any, index: number) => (
              <div
                key={index}
                className="border flex gap-2 p-2 rounded-md text-white"
              >
                <img
                  className="self-start"
                  width={40}
                  height={40}
                  src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1689648803~exp=1689649403~hmac=8221da22c9670528695687067141c28c1883ebdb1aebeb0124806842e22c3328"
                  alt=""
                />
                <div>
                  <h2 className="text-xl font-semibold">{review?.name}</h2>
                  <p>{review}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews given yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

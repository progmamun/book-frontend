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
import jwt_decode from "jwt-decode";

const BookDetails = () => {
  const user = useAppSelector((state) => state.user);

  const decodedToken: any = isStringNonNull(user.accessToken)
    ? jwt_decode(user.accessToken)
    : null;

  // Type guard to check if a value is a non-null string
  function isStringNonNull(value: any): value is string {
    return typeof value === "string" && value !== null;
  }
  // console.log(decodedToken);
  const email = decodedToken.userEmail;
  console.log(email);

  const [review, setReview] = useState("");
  const { slug } = useParams<{ slug: any }>();
  const { data, isLoading } = useBookDetailsQuery(slug);

  const [deleteBook, { isSuccess }] = useDeleteBookMutation(data?.data?.slug);

  const [postReview, { error }] = usePostReviewMutation();
  // console.log(user.accessToken, user.accessToken.email);

  const navigate = useNavigate();
  const handleDelete = () => {
    const sure = confirm("Are you Sure?");
    if (sure) {
      deleteBook(data?.data?.slug);
    }
  };
  const postReviewHandle = (e: any) => {
    e.preventDefault();
    postReview({
      slug,
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
      navigate("/");
    }
    console.log(error);
  }, [isLoading, isSuccess, error, navigate]);

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 flex gap-3 justify-end">
          {email && (
            <Link to="/add-new-book" className="btn">
              Add New Book
            </Link>
          )}
          {user.id === data?.data?.authorId && (
            <div className="flex gap-3">
              <Link className="btn btn-secondary" to={`/edit-book/${slug}`}>
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
          {data?.data?.reveiws ? (
            data?.data?.reveiws.map((item: any) => (
              <div
                key={item.review}
                className="border flex gap-2 p-2 rounded-md bg-white"
              >
                <img
                  className="self-start"
                  width={40}
                  height={40}
                  src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1689648803~exp=1689649403~hmac=8221da22c9670528695687067141c28c1883ebdb1aebeb0124806842e22c3328"
                  alt=""
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>{item.review}</p>
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

/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/restrict-template-expressions*/
/* eslint-disable @typescript-eslint/no-floating-promises*/
/* eslint-disable @typescript-eslint/no-misused-promises*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBookMutation } from "../redux/features/book/bookApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAppSelector } from "../redux/hook";

type FormValues = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  email: string;
};

export default function AddNewBook() {
  const user = useAppSelector((state) => state.user);

  const decodedToken: any = isStringNonNull(user.accessToken)
    ? jwt_decode(user.accessToken)
    : null;

  // Type guard to check if a value is a non-null string
  function isStringNonNull(value: any): value is string {
    return typeof value === "string" && value !== null;
  }
  const email = decodedToken.userEmail;

  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const [createBook, { isSuccess, isError }] = useCreateBookMutation();
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    formData.email = email;
    console.log(formData);
    createBook(formData);
    // console.log(error, isError);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New Book Added Successfully");
      navigate("/all-book");
    }
    console.log(isError);
  }, [isError, isSuccess, navigate]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div className="container">
      <div className="max-w-[450px] mx-auto p-3 sm:p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-5">
          Add New Book
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Book Title"
            {...register("title")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Author Name"
            {...register("author")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Genre"
            {...register("genre")}
          />
          <input
            className="input input-bordered input-primary w-full "
            type="text"
            placeholder="Publication Year"
            {...register("publicationYear")}
          />
          <input type="hidden" value={email} {...register("email")} />
          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </div>
  );
}

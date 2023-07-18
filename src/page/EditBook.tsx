import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBookDetailsQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
type FormValues = {
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};

export default function EditBook() {
  const { register, handleSubmit } = useForm<FormValues>();

  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, isLoading, isError } = useBookDetailsQuery(slug);

  //   console.log(data);
  const [updateBook, { isSuccess, error }] = useUpdateBookMutation();
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);
    updateBook({ slug, body: formData });
  };

  useEffect(() => {
    if (isLoading) {
      <p>Loading.. please wait.!</p>;
    }
    if (isError) {
      <p>something went wrong. please try to reload the page.!!</p>;
    }
    if (isSuccess) {
      navigate("/");
    }
    console.log(error);
  }, [isLoading, isSuccess, error, navigate, isError]);

  console.log(data);
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div className="container">
      <div className="max-w-[450px] mx-auto p-3 sm:p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-5">Edit Book.</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            defaultValue={data?.data?.title}
            placeholder="Book Title"
            {...register("title")}
          />

          <input
            className="input input-bordered input-primary w-full"
            type="text"
            defaultValue={data?.data?.author}
            placeholder="Author Name"
            {...register("author")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Genre"
            defaultValue={data?.data?.genre}
            {...register("genre")}
          />
          <input
            className="input input-bordered input-primary w-full "
            type="text"
            placeholder="Publication Year"
            defaultValue={data?.data?.publicationDate}
            {...register("publicationDate", { valueAsNumber: true })}
          />

          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </div>
  );
}

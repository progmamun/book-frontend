export default function BookCard() {
  /*
    Title
    Author
    Genre
    Publication Date
    */
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Title:</h2>
          <p>Author: </p>
          <p>Genre: </p>
          <p>Publication Data:</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Book Details</button>
          </div>
        </div>
      </div>
    </>
  );
}

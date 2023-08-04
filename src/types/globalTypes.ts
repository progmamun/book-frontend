export interface IBook {
  _id: string;
  id: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  slug: string;
  publicationDate: string;
  img: string;
  customerReviews?: [];
}

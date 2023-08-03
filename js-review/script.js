const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}
/*
//DFeSTRUCTRUING DATA
const book = getBook(5);
const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book;

console.log(author, title, genres);

//creates another array with name as othergenre - rest eleemnt must be the last element in the array
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;

console.log(primaryGenre, secondaryGenre, otherGenres);

//using spread -will remove the values  and present them in a numbered form
const newGenres = [...genres, "epic fantasy"];

console.log(newGenres);

//working with objects
const updatedBook = {
  ...book, //spread out needs to be 1st
  moviePublicationDate: "2001-12-19",
  pages: 1210,
};
updatedBook;

//template literals -
const summary = `${title} of book  and id is ${book.id} with ${book.pages} pages and author is ${book.author}`;
summary;

//ternary operator
//condition - operand - expression
const pgRange = pages > 1000 ? "over 1000" : "less than 1000";
pgRange;

// function getYear(str) {
//   return str.split("-")[0];
// }

//arrow func - common in arrow methods
const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));

// logical operator - & | ?
console.log(false && "same operator");
console.log(hasMovieAdaptation || "has a movie");

//falsy - 0 , '' , null , undefined
//truthy - 1 , 'a' , '0' , 'false'

// or operator
console.log(true || "true");

const spanishTranslation = book.translations.spanish || "no translation";
spanishTranslation;

const count = book.reviews.librarything.reviewsCount ?? "no data";
count;

//chainng operator
//optional - only continues if pattern is undefined
function getTotalReviewCount(book) {
  const goodRead = book.reviews?.goodreads?.reviewsCount;
  const libraryThing = book.reviews?.librarything?.reviewsCount;
  return goodRead + libraryThing;
}
console.log(getTotalReviewCount(book));



//map method - loop throigh element  - create new array based on original array
const books = getBooks();
books;

const titles = books.map((book) => book.title);
titles;

const essentialData = books.map((book) => {
  return {
    title: book.title,
    author: book.author,
    pages: book.pages,
  };
});
essentialData;

//filter method - filter out elements from array
const longBooks = books.filter((book) => book.pages >= 500);

longBooks;

//reduce - takes in callback func - results in just one value
//acc - acculumuator - current value of the final element in the array - adds in all the values starting from 0 and takes value from array
const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
pagesAllBooks;

//sort
const sortBooks = books.sort((genres, pages) => genres - pages);
sortBooks;

//immutable
//add book obj to arr
const newBook = {
  id: 6,
  title: "The Lord of the Rings 3",
  author: "J. R. R. Tolkien",
};
const updatedBooks = [...books, newBook];
updatedBooks;

//remove book obj from arr
const removeBook = updatedBooks.filter((book) => book.id !== 6);
removeBook;

//update book obj in arr
const updatedBook = removeBook.map((book) =>
  //overrites the property and then uodates the array with the new value
  book.id === 1 ? { ...book, pages: 1212 } : book
);
updatedBook;


//then - takes callback func - using promise
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));
*/

// async - await

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);
}
getTodos();

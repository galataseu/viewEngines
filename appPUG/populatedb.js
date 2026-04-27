#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database.'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Book = require("./models/book");
const Author = require("./models/author");
const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");

const genres = [];
const authors = [];
const books = [];
const bookinstances = [];

const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Connected");

  await createGenres();
  await createAuthors();
  await createBooks();
  await createBookInstances();

  console.log("Debug: Closing mongoose");
  await mongoose.connection.close();
}

// =======================
// CREATE FUNCTIONS
// =======================

async function genreCreate(index, name) {
  const genre = new Genre({ genre: name }); // ✅ corrigido aqui
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function authorCreate(index, first_name, family_name, d_birth, d_death) {
  const authordetail = { first_name, family_name };

  if (d_birth) authordetail.date_of_birth = d_birth;
  if (d_death) authordetail.date_of_death = d_death;

  const author = new Author(authordetail);
  await author.save();

  authors[index] = author;
  console.log(`Added author: ${first_name} ${family_name}`);
}

async function bookCreate(index, title, summary, isbn, author, genre) {
  const bookdetail = {
    title,
    summary,
    isbn,
    author,
  };

  if (genre) bookdetail.genre = genre;

  const book = new Book(bookdetail);
  await book.save();

  books[index] = book;
  console.log(`Added book: ${title}`);
}

async function bookInstanceCreate(index, book, imprint, due_back, status) {
  const bookinstancedetail = {
    book,
    imprint,
  };

  if (due_back) bookinstancedetail.due_back = due_back;
  if (status) bookinstancedetail.status = status;

  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();

  bookinstances[index] = bookinstance;
  console.log(`Added bookinstance: ${imprint}`);
}

// =======================
// DATA CREATION
// =======================

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Fantasy"),
    genreCreate(1, "Science Fiction"),
    genreCreate(2, "French Poetry"),
  ]);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate(0, "Patrick", "Rothfuss", "1973-06-06", null),
    authorCreate(1, "Ben", "Bova", "1932-11-08", null),
    authorCreate(2, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
    authorCreate(3, "Bob", "Billings", null, null),
    authorCreate(4, "Jim", "Jones", "1971-12-16", null),
  ]);
}

async function createBooks() {
  console.log("Adding books");
  await Promise.all([
    bookCreate(
      0,
      "The Name of the Wind",
      "Story of Kvothe...",
      "9781473211896",
      authors[0],
      [genres[0]]
    ),
    bookCreate(
      1,
      "The Wise Man's Fear",
      "Continuation of Kvothe's story...",
      "9788401352836",
      authors[0],
      [genres[0]]
    ),
    bookCreate(
      2,
      "Apes and Angels",
      "Humankind travels to the stars...",
      "9780765379528",
      authors[1],
      [genres[1]]
    ),
    bookCreate(
      3,
      "Test Book",
      "Just a test",
      "ISBN123456",
      authors[4],
      [genres[0], genres[1]]
    ),
  ]);
}

async function createBookInstances() {
  console.log("Adding book instances");
  await Promise.all([
    bookInstanceCreate(0, books[0], "Imprint 1", null, "Available"),
    bookInstanceCreate(1, books[1], "Imprint 2", null, "Loaned"),
    bookInstanceCreate(2, books[2], "Imprint 3", null, "Available"),
    bookInstanceCreate(3, books[3], "Imprint 4", null, "Maintenance"),
  ]);
}
import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });

const quotes = [
  {
    id: 1,
    title:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    authorID: 1,
  },
  {
    id: 2,
    title: "Imagination is more important than knowledge.",
    authorID: 1,
  },
  {
    id: 3,
    title: "The greatest scientists are artists as well.",
    authorID: 1,
  },
  {
    id: 4,
    title:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    authorID: 1,
  },
  {
    id: 5,
    title:
      "A man who dares to waste one hour of time has not discovered the value of life.",
    authorID: 1,
  },
  {
    id: 6,
    title:
      "All our dreams can come true, if we have the courage to pursue them",
    authorID: 2,
  },
  {
    id: 7,
    title: "If you can dream it, you can do it",
    authorID: 2,
  },
  {
    id: 8,
    title: "Work hard in silence, let your success be your noise",
    authorID: 3,
  },
  {
    id: 9,
    title:
      "The art and science of asking questions is the source of all knowledge",
    authorID: 4,
  },
  {
    id: 10,
    title: "The science of today is the technology of tomorrow",
    authorID: 5,
  },
];

const authors = [
  {
    id: 1,
    name: "Albert Einstein",
    image: "",
  },
  {
    id: 2,
    name: "Walt Disney",
    image: "",
  },
  {
    id: 3,
    name: "Frank Ocean",
    image: "",
  },
  {
    id: 4,
    name: "Thomas Berger",
    image: "",
  },
  {
    id: 5,
    name: "Edward Teller",
    image: "",
  },
];

const createQuotesTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS quotes(
    id INTEGER,
    title TEXT,
    authorID INTEGER,
    PRIMARY KEY(id)
  );
  `);

createQuotesTable.run();

const deleteAllQuotes = db.prepare(`
  DELETE FROM quotes;
  `);
deleteAllQuotes.run();

const createQuote = db.prepare(`
  INsert INTO quotes (title,authorID) VALUES(@title,@authorID)
  `);

for (let quote of quotes) {
  createQuote.run(quote);
}

const cerateAuthorTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS authors(
    id INTEGER,
    name TEXT,
    image TEXT,
    PRIMARY KEY (id)
  );`);

cerateAuthorTable.run();

const deleteAllAuthors = db.prepare(`
  DELETE FROM authors;
  `);

deleteAllAuthors.run();

const createAuthor = db.prepare(`
  INsert INTO authors (name,image) VALUES(@name,@image)
  `);

for (let author of authors) {
  createAuthor.run(author);
}

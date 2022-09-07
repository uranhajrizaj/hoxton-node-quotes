import express from "express";
import cors from "cors";

import Database from "better-sqlite3";
const db = Database("./db/data.db", { verbose: console.log });

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const getAllQuotes = db.prepare(`
SELECT * FROM quotes;
`);

app.get("/quotes", (req, res) => {
  const quotes = getAllQuotes.all();
  res.send(quotes);
});

const getAllAuthors = db.prepare(`
SELECT * FROM authors;
`);

app.get("/authors", (req, res) => {
  const authors = getAllAuthors.all();
  res.send(authors);
});

const getAnAuthor = db.prepare(`
SELECT * FROM authors WHERE id=@id
`);

app.get("/authors/:id", (req, res) => {
  const author = getAnAuthor.get(req.params);
  if (author) res.send(author);
  else res.status(404).send({ error: "Author not found" });
});

const getAQuoute = db.prepare(`
SELECT * FROM quotes WHERE id=@id `);

app.get("/quotes/:id", (req, res) => {
  const quote = getAQuoute.get(req.params);
  if (quote) res.send(quote);
  else res.status(404).send({ error: "Quote not found" });
});

const createAQuote = db.prepare(`
INSERT INTO quotes (title,authorID) VALUES(@title,@authorID)
`);

app.post("/quotes", (req, res) => {
  const info = createAQuote.run(req.body);
  const quote = getAQuoute.get({ id: info.lastInsertRowid });
  res.send(quote);
});

const createAuthor = db.prepare(`
INSERT INTO authors (name,image) VALUES(@name,@image)
`);

app.post("/authors", (req, res) => {
  const info = createAuthor.run(req.body);
  const author = getAnAuthor.get({ id: info.lastInsertRowid });
  res.send(author);
});

const deleteAnAuthor = db.prepare(`
DELETE FROM authors WHERE id=@id
`);

app.delete("/authors/:id", (req, res) => {
  const info = deleteAnAuthor.run(req.params);
  if (info.changes) res.send({ messsage: "Author deleted succesfuly" });
  else res.status(404).send({ error: "Author not found" });
});

const deleteAQuote = db.prepare(`
DELETE FROM quotes WHERE id=@id
`);

app.delete("/quotes/:id", (req, res) => {
  const info = deleteAQuote.run(req.params);
  if (info.changes) res.send({ messsage: "Quote deleted succesfuly" });
  else res.status(404).send({ error: "Quote not found" });
});

const updateAnAuthor = db.prepare(`
UPDATE authors
SET name=@name, image=@image
WHERE id=@id;
`);

app.patch("/authors/:id", (req, res) => {
  const findAuthor = getAnAuthor.get(req.params);
  if (findAuthor) {
    const updatedAuthor = { ...findAuthor, ...req.body };
    updateAnAuthor.run(updatedAuthor);
    res.send(updatedAuthor);
  } else res.status(404).send({ error: "Author not found" });
});

const updateAQuote = db.prepare(`
UPDATE quotes
SET title=@title, authorID=@authorID
WHERE id=@id;
`);

app.patch("/quotes/:id", (req, res) => {
  const findQuote = getAQuoute.get(req.params);
  if (findQuote) {
    const updatedQuote = { ...findQuote, ...req.body };
    updateAQuote.run(updatedQuote);
    res.send(updatedQuote);
  } else res.status(404).send({ error: "Quote not found" });
});

app.listen(port, () => {
  console.log(`Server is runing in : http://localhost:${port}/quotes`);
});

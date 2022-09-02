import express from "express";
import cors from "cors";
const app = express();
const port = 4000;

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

app.use(cors());
app.use(express.json());

app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.post("/quotes", (req, res) => {
  if (req.body.title !== "string")
    res.status(400).send({ error: "title is not a string" });
  const newQuote = {
    id: quotes[quotes.length - 1].id + 1,
    title: req.body.title,
    authorID: authors[authors.length - 1].id + 1,
  };
  quotes.push(newQuote);
  res.send(newQuote);
});

app.get("/authors", (req, res) => {
  res.send(authors);
});

app.post("authors", (req, res) => {
  let errors: String[] = [];
  if (req.body.name !== "string") errors.push("Name is not a string");
  if (req.body.image !== "string") errors.push("Image is not a string");
  const newAuthor = {
    id: authors[authors.length - 1].id + 1,
    name: req.body.name,
    image: req.body.image,
  };
  if (errors.length === 0) res.send(newAuthor);
  else res.status(400).send({ errors: errors });
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((quote) => quote.id === id);
  if (match) res.send(match);
  else res.status(404).send({ error: "Item not found" });
});

app.get("/authors/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = authors.find((author) => author.id === id);
  if (match) res.send(match);
  else res.status(404).send({ error: "Item not found" });
});

app.delete("/authors/:id", (req, res) => {
  const id = Number(req.params.id);
  const findAuthorIndex = authors.findIndex((author) => author.id === id);
  if (findAuthorIndex > -1) {
    authors.splice(findAuthorIndex, 1);
    res.send({ message: "Author deletes successfully" });
  } else res.status(404).send({ error: "Author not found " });
});
app.patch("/authors/:id", (req, res) => {
  const id = Number(req.params.id);
  const authorToUpdate = authors.find((author) => author.id === id);
  if (authorToUpdate) {
    if (req.body.name) authorToUpdate.name = req.body.name;
    if (req.body.image) authorToUpdate.image = req.body.image;
    res.send(authorToUpdate);
  } else {
    res.status(404).send({ error: "Author not found" });
  }
});

app.delete("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const findQuoteIndex = authors.findIndex((author) => author.id === id);
  if (findQuoteIndex > -1) {
    quotes.splice(findQuoteIndex, 1);
    res.send({ message: "Quote deletes successfully" });
  } else res.status(404).send({ error: "Quote not found " });
});

app.patch("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quoteToUpdate = quotes.find((quote) => quote.id === id);
  if (quoteToUpdate) {
    if (req.body.title) quoteToUpdate.title = req.body.title;
    if (req.body.authorID) quoteToUpdate.authorID = req.body.authorID;
    res.send(quoteToUpdate);
  } else {
    res.status(404).send({ error: "Quote not found" });
  }
});

app.get("/random", (req, res) => {
  const randomQuoteIndex = Math.floor(quotes.length * Math.random());
  const randomQuote = quotes[randomQuoteIndex];
  const author = authors.find((author) => author.id === randomQuote.authorID);
  res.send({ ...randomQuote, author });
});

app.get("/quotes&author", (req, res) => {
  const quotesAuthor = quotes.map((quote) => {
    const author = authors.find((author) => author.id === quote.authorID);
    return { ...quote, author };
  });
  res.send(quotesAuthor);
});

app.get("*", (req, res) => {
  res.send(404);
});

app.listen(port, () => {
  console.log(`Server is runing in : http://localhost:${port}/quotes`);
});

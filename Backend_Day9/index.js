const express = require("express");
const app = express();


app.use(express.json());

// ! Book information
const BookStore = [
  {
    id: 1,
    Language: "Python",
    bookName: "Python Crash Course",
    Author: "Eric Matthest",
    Description: "Hands-on beginner book with 3 practical projects.",
  },
  {
    Language: "React",
    id: 2,
    bookName: "Fullstack React",
    Author: "Anthony Accomazzo et al.",
    Description: "Covers React + Node + API integration end-to-end.",
  },
  {
    id: 3,
    Language: "css",
    bookName: "CSS Secrets",
    Author: "Lea Veroun",
    Description: "Real-world design tricks and creative CSS solutions.n",
  },
  {
    Language: "java",
    id: 4,
    bookName: "Effective Java",
    Author: "Joshua Bloch",
    Description: "Professional-level practices for writing robust Java code.",
  },
  {
    Language: "javaScript",
    id: 5,
    bookName: "Learning Web Design",
    Author: "Marijn Haverbeke",
    Description: "Modern JS explained with examples and projects",
  },
  {
    Language: "Html",
    id: 6,
    bookName: "Learning Web Design",
    Author: "Jennifer Niederst Robbins",
    Description: "Covers HTML5, CSS3, and web basics from zero.",
  },
  {
    Language: "Python",
    id: 7,
    bookName: "Automate",
    Author: "Al Sweigart",
    Description: "Automate boring tasks using Python",
  },
];

// ! Data retrieve karne ke liye (read-only)

app.get("/book", (req, res) => {
  if (req.query.Language) {
    const book = BookStore.filter(
      (info) => info.Language === req.query.Language
    );
    res.send(book);
  }
  if (req.query.bookName) {
    const book = BookStore.filter(
      (info) => info.bookName === req.query.bookName
    );
    res.send(book);
  }
});

// ! Search book for id
app.get("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = BookStore.find((info) => info.id === id);
  res.send(book);
});

// ! Server me data bhejna / create karna
// ! Postman ya frontend form ke through test hota hai (browser se direct nahi).
app.post("/book", (req, res) => {
  const newBook = req.body;
  BookStore.push(newBook);
  console.log("New book added successfully");
  res.send("New book added successfully");
});

// ! Existing data me paticular infomatin ko update karne ke liye.
app.patch("/book", (req, res) => {
  console.log(req.body);
  const Book = BookStore.find((info) => info.id === req.body.id);
  if (req.body.Language) {
    Book.Language = req.body.Language;
  }
  if (req.body.Author) {
    Book.Author = req.body.Author;
  }
  if (req.body.bookName) {
    Book.bookName = req.body.bookName;
  }
  if (req.body.Description) {
    Book.Description = req.body.Description;
  }

  res.send("patch uptated successfully");
});

// ! Existing data update karne ke liye.
app.put("/book", (req, res) => {
  const book = BookStore.find((info) => info.id === req.body.id);
  book.Author = req.body.Author;
  book.Language = req.body.Language;
  book.bookName = req.body.bookName;
  book.Description = req.body.Description;
  res.send("Data Updated successfully");
});
 
// ! Existing record delete karne ke liye.
app.delete("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //   console.log(id);

  const index = BookStore.findIndex((info) => info.id === id);
  //   console.log(index);

  BookStore.splice(index, 1);
  res.send("Successfully Deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port number 3000");
});

const messages = [
  {
    text: "hello...",
    user: "User 1",
    created: new Date(),
  },
  {
    text: "hello?",
    user: "User 2",
    created: new Date(),
  },
];

export function getAll(_req, res) {
  res.render("index", {
    content: "messages-list",
    messages: messages,
  });
}

export function getNew(_req, res) {
  res.render("index", {
    content: "messages-new",
  });
}

export function postNew(req, res) {
  console.log(req.body);

  const author = req.body.author ? req.body.author.trim() : "";
  const text = req.body.text ? req.body.text.trim() : "";

  if (author.length > 0 && text.length > 0) {
    messages.push({ text: text, user: author, created: new Date() });
    res.redirect("/");
  } else {
    res.render("index", {
      content: "messages-new",
      error:
        author.length == 0
          ? "Message author is empty"
          : "Message text is empty",
      author: author,
      text: text,
    });
  }
}

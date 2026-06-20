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
    title: "Messages",
    content: "messages-list",
    messages: messages,
  });
}

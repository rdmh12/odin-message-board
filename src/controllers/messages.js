import * as db from "../db/messages.js";

export async function getAll(req, res) {
  const messages = await db.getAll();
  const language = getRequestLanguage(req);

  res.render("index", {
    content: "messages-list",
    messages,
    language,
    maxMessageSize: 50,
  });
}

export async function getOne(req, res, next) {
  const id = Number.parseInt(req.params.id);

  if (!Number.isNaN(id)) {
    const messages = await db.getOne(id);

    if (messages.length == 1) {
      const language = getRequestLanguage(req);

      res.render("index", {
        content: "messages-show",
        message: messages[0],
        language: language,
      });

      return;
    }
  }

  next("route");
}

export function getNew(_req, res) {
  res.render("index", {
    content: "messages-new",
    message: { author: "", content: "" },
  });
}

export async function postNew(req, res) {
  console.log(req.body);

  const author = req.body.author ? req.body.author.trim() : "";
  const content = req.body.content ? req.body.content.trim() : "";
  const errors = [];

  if (author.length == 0) errors.push("Message author is empty");
  if (author.length > 16)
    errors.push("Message author is too long (max 16 characters)");
  if (content.length == 0) errors.push("Message text is empty");

  if (errors.length == 0) {
    await db.insert(author, content, new Date());
    res.redirect("/");
  } else {
    res.status(400).render("index", {
      content: "messages-new",
      errors,
      message: { author, content },
    });
  }
}

function getRequestLanguage(req) {
  const languages = req.acceptsLanguages();
  return languages.length > 0 ? languages[0] : "en-US";
}

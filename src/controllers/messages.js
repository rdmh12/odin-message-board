const messages = [
  {
    id: 0,
    text: "Morbi ut felis vel felis accumsan volutpat. Donec aliquam ut arcu nec tincidunt. Nam id diam sed libero porta lacinia ac quis purus. Ut in sollicitudin arcu. Aliquam laoreet, nibh ut euismod maximus, est erat dictum odio, bibendum euismod metus turpis sit amet libero. Quisque iaculis tincidunt posuere. Mauris pretium rhoncus arcu nec ultrices. Cras rutrum volutpat tortor, id aliquet neque molestie sit amet. Vestibulum vel mi vitae arcu ultrices convallis ut nec leo.",
    user: "User 1",
    created: new Date(),
  },
  {
    id: 1,
    text: "Duis eget lectus massa. Nam dignissim nisi in maximus convallis. Vivamus quis lacinia ipsum, nec cursus dolor. Phasellus sagittis nisi lorem, sit amet iaculis odio tincidunt id. Proin nisi ipsum, dictum id elit sed, tristique suscipit tortor. Fusce sodales rutrum nibh id fermentum. Proin turpis sem, fringilla nec scelerisque sed, sodales vitae nisi.",
    user: "User 2",
    created: new Date(),
  },
];

export function getAll(req, res) {
  const language = getRequestLanguage(req);
  const maxMessageSize = 50;

  res.render("index", {
    content: "messages-list",
    messages: messages
      .toSorted((a, b) => b.created - a.created)
      .map((message) => ({
        ...message,
        text:
          message.text.length > maxMessageSize
            ? message.text.substring(0, maxMessageSize) + "..."
            : message.text,
        created: message.created.toLocaleString(language),
      })),
  });
}

export function getOne(req, res, next) {
  const language = getRequestLanguage(req);
  const index = Number.parseInt(req.params.id);

  if (Number.isNaN(index) || index < 0 || index >= messages.length) {
    next("route");
    return;
  }

  const message = messages[index];

  res.render("index", {
    content: "messages-show",
    message: {
      ...message,
      created: message.created.toLocaleString(language),
    },
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
    messages.push({
      id: messages.length,
      text: text,
      user: author,
      created: new Date(),
    });
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

function getRequestLanguage(req) {
  const languages = req.acceptsLanguages();
  return languages.length > 0 ? languages[0] : "en-US";
}

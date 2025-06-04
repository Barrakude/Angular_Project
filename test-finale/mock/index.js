const cors = require('cors');
const jsonServer = require("json-server");
const path = require('path');
const _ = require('lodash');

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const PORT = 3000;

const parseLink = (value) => {
  const linkHeadersArray = value
    .split(", ")
    .map(header => header.split("; "));
    const linkHeadersMap = linkHeadersArray
      .map(header => {
        const rel = header[1].replace(/"/g, "").replace("rel=", "");
        const url = header[0].slice(1, -1);
        const page = url.split('&')[0].split('_page=')[1];
        return [rel, +page]
      });
    return Object.fromEntries(linkHeadersMap);
};

router.render = (req, res) => {
  const totalCount = _(res.get('x-total-count'))?.value();
  const link = _(res.get('Link')).value();
  const linkData = !!link ? parseLink(link) : undefined;

  res.jsonp({
    prev: !!link ? (linkData.prev || null) : undefined,
    next: !!link ? (linkData.next || null) : undefined,
    first: !!link ? (linkData.first || null) : undefined,
    last: !!link ? (linkData.last || null) : undefined,
    totalCount,
    data: res.locals.data
  });
};

app.use(
  cors({
    origin: ['http://localhost:4200']
  })
);
app.use(jsonServer.bodyParser);
app.use(middlewares);

app.use((req, res, next) => {
  if(req.method === "POST") {
    req.body['status'] = 'todo';
    next();
  } else {
    next();
  }
});

app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

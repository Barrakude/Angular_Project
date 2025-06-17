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

// Middleware per logging delle richieste
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// Middleware per timeout delle richieste
app.use((req, res, next) => {
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(408).json({
        error: 'Request timeout',
        message: 'La richiesta ha impiegato troppo tempo'
      });
    }
  }, 30000); // 30 secondi timeout

  res.on('finish', () => {
    clearTimeout(timeout);
  });

  next();
});

// Configurazione CORS migliorata
app.use(
  cors({
    origin: ['http://localhost:4200'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body parser con limite dimensioni
app.use(jsonServer.bodyParser);

// Middleware defaults di json-server
app.use(middlewares);

// La tua logica esistente per i POST
app.use((req, res, next) => {
  if(req.method === "POST") {
    req.body['status'] = 'todo';
    next();
  } else {
    next();
  }
});

// Middleware per gestione errori prima del router
app.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error('Errore nella richiesta:', error);
    res.status(500).json({
      error: 'Errore interno del server',
      message: error.message
    });
  }
});

// La tua logica di rendering personalizzata
router.render = (req, res) => {
  try {
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
  } catch (error) {
    console.error('Errore nel rendering:', error);
    res.status(500).json({
      error: 'Errore nel rendering dei dati',
      message: error.message
    });
  }
};

app.use(router);

// Middleware per gestione 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint non trovato',
    path: req.originalUrl
  });
});

// Gestione errori globale
app.use((err, req, res, next) => {
  console.error('Errore globale:', err.stack);
  
  if (!res.headersSent) {
    res.status(500).json({
      error: 'Errore interno del server',
      message: err.message
    });
  }
});

// Avvio server con gestione errori
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API disponibile su http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM ricevuto. Chiusura server...');
  server.close(() => {
    console.log('Server chiuso correttamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT ricevuto. Chiusura server...');
  server.close(() => {
    console.log('Server chiuso correttamente');
    process.exit(0);
  });
});

// Gestione errori non catturati
process.on('uncaughtException', (err) => {
  console.error('Eccezione non catturata:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise rejection non gestita:', reason);
  process.exit(1);
});

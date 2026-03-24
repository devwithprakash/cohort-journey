// ✅ Step 1: Store middleware

const middlewares = [];

// ✅ Step 2: Register middleware

function use(fn) {
  middlewares.push(fn);
}
// ✅ Step 3: Create runner (important part 🔥)

function runMiddlewares(req, res) {
  let index = 0;

  function next() {
    const middleware = middlewares[index++];
    if (middleware) {
      middleware(req, res, next);
    }
  }

  next();
}

// ✅ Step 4: Create server
const http = require("http");

const server = http.createServer((req, res) => {
  runMiddlewares(req, res);
});

server.listen(3000);

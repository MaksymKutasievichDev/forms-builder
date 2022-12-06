require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.statusCode(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,authorization,x-access-token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const logs = [
  {
    username: "Maksym",
    password: "1111",
    templatemap: ["Input", "Input", "Checkbox", "Button"],
    formstyles: {
      label: "My Form",
      color: "Green",
      background: "LightCoral",
      borderStyle: "dashed",
      borderColor: "White",
    },
    elementstyles:
      '[{"label":"Lable"},{"label":"Label","placeholder":"New plchldr"},{},{"label":"Login"}]',
  },
];

app.get("/check", authenticateToken, (req, res) => {
  res.json(logs.filter((log) => log.username === req.user.name));
});

app.post("/save_template", authenticateToken, (req, res) => {
  for (let i = 0; i < logs.length; i++) {
    if (logs[i].username == req.user.name) {
      logs[i].templatemap = req.body.templatemap;
      logs[i].formstyles = req.body.formstyles;
      logs[i].elementstyles = req.body.elementstyles;
      console.log("save_template");
      console.log(logs);
      res.json({ success: true });
      return true;
    }
  }
  res.json({ success: false, error: "Template wasn't saved" });
});

app.get("/get_user_data", authenticateToken, (req, res) => {
  res.json(logs.filter((log) => log.username === req.user.name));
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = { name: username, password: password };

  let loginExist = false;
  let passExist = false;

  for (let i = 0; i < logs.length; i++) {
    if (logs[i].username == user.name) {
      loginExist = true;
      if (logs[i].password === user.password) {
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
        return true;
      }
      break;
    }
  }
  !loginExist
    ? res.json({ success: false, error: "The user does not exist" })
    : "";
  !passExist ? res.json({ success: false, error: "Wrong password" }) : "";
});

app.post("/register", (req, res) => {
  //Auth user
  const username = req.body.username;
  const password = req.body.password;
  const user = { name: username, password: password };

  for (let i = 0; i < logs.length; i++) {
    if (Object.values(logs[i]).indexOf(user.name) > -1) {
      res.json({ success: false, error: "The user is already registered" });
      return true;
    }
  }

  logs.push({
    username: user.name,
    password: user.password,
    templatemap: [],
    formstyles: {},
    elementstyles: "[]",
  });
  console.log(logs);

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(4000);

const { MongoClient } = require("mongodb");

//MOONGO DB TEST
const url =
  "mongodb+srv://Mandarin753951a:Mandarin753951@formbuilder.84mwcbv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const database = client.db("FormBuilder");
const haiku = database.collection("FormBuilderDb");

async function registerUserMongoDb(doc) {
  try {
    const resutl = await haiku.insertOne(doc);
  } finally {
  }
}

async function findUserDataMongoDb(user) {
  try {
    const query = {
      username: user.name,
    };
    const options = {
      projection: {
        _id: 0,
        username: 1,
        password: 1,
        templatemap: 1,
        formstyles: 1,
        elementstyles: 1,
      },
    };

    const result = await haiku.findOne(query, options);
    return result;
  } finally {
  }
}

async function updateUserDataMongoDb(user, newData) {
  try {
    result = await haiku.findOneAndUpdate(
      {
        username: user,
      },
      {
        $set: {
          templatemap: newData.templatemap,
          formstyles: newData.formstyles,
          elementstyles: newData.elementstyles,
        },
      },
      {
        upsert: true,
      }
    );
    return result;
  } catch (error) {}
}
////

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

app.post("/save_template", authenticateToken, (req, res) => {
  const user = req.user.name;
  const newData = {
    templatemap: req.body.templatemap,
    formstyles: req.body.formstyles,
    elementstyles: req.body.elementstyles,
  };
  updateUserDataMongoDb(user, newData)
    .catch(console.dir)
    .then((dbResponse) => {
      res.json({ success: true });
    });
});

app.get("/get_user_data", authenticateToken, (req, res) => {
  const user = {
    name: req.user.name,
  };
  findUserDataMongoDb(user)
    .catch(console.dir)
    .then((dbReq) => {
      if (dbReq) {
        res.json(dbReq);
      }
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = { name: username, password: password };

  findUserDataMongoDb(user)
    .catch(console.dir)
    .then((dbReq) => {
      if (dbReq) {
        if (dbReq.password == user.password) {
          const accessToken = generateAccessToken(user);
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
          refreshTokens.push(refreshToken);
          res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
          res.status(500).send("Wrong password");
        }
      } else {
        res.status(500).send("The user does not exist.");
      }
    });
});

app.post("/register", (req, res) => {
  //Auth user
  const username = req.body.username;
  const password = req.body.password;
  const user = { name: username, password: password };

  const newUserData = {
    username: user.name,
    password: user.password,
    templatemap: [],
    formstyles: {},
    elementstyles: "[]",
  };

  findUserDataMongoDb(user)
    .catch(console.dir)
    .then((dbReq) => {
      if (dbReq) {
        res.status(500).send("The user is already registered.");
      } else {
        registerUserMongoDb(newUserData).catch(console.dir);
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      }
    });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
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

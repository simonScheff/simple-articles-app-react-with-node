import express from "express";
import fs from "fs";
import { db, connectToDB } from "./db.js";
import admin from "firebase-admin";
const app = express();

const credentials = JSON.parse(fs.readFileSync("./src/credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", ["authtoken", "content-type"]);

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// Middleware
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;
  req.user = {};
  if (authtoken) {
    admin
      .auth()
      .verifyIdToken(authtoken)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch((e) => {
        console.error(e, "e");
        res.sendStatus(400);
      });
    return;
  }

  next();
});

app.get("/api/articles/:articleName", async (req, res) => {
  const { articleName } = req.params;
  const article = await getArticle(articleName);
  if (!article) {
    return res.sendStatus(404);
  }
  article.canVote = userCanVote(article.ids || [], req.user.uid);

  return res.json(article);
});

app.get("/api/articles", async (req, res) => {
  const articles = await getAllArticles();
  return articles ? res.json(articles) : res.sendStatus(404);
});

app.put(
  "/api/articles/:articleName/upvote",
  middlewareIsUserExists(),
  async (req, res) => {
    const { articleName } = req.params;
    const article = await getArticle(articleName);
    if (!userCanVote(article.uppvoteIds || [], req.user.uid)) {
      return res.send({ error: "User already vote" });
    }

    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $inc: { upvotes: 1 },
        $addToSet: { ids: req.user.uid },
      }
    );

    const updatedArticle = await getArticle(articleName);
    updatedArticle ? res.send(updatedArticle) : res.send("Failed");
  }
);

app.post(
  "/api/articles/:articleName/comments",
  middlewareIsUserExists(),
  async (req, res) => {
    const comment = req.body;
    const { email } = req.user;
    const { articleName } = req.params;
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $push: { comments: { ...comment, email } },
      }
    );
    const article = await getArticle(articleName);
    article ? res.send(article) : res.send("Failed");
  }
);

app.listen(8000, async () => {
  console.log("server is listening on port 8000");
  await connectToDB();
});

async function getArticle(articleName) {
  return await db.collection("articles").findOne({ name: articleName });
}

async function getAllArticles() {
  return await db
    .collection("articles")
    .find(
      {},
      {
        projection: {
          _id: 0,
          title: 1,
          name: 1,
          content: {
            $slice: 1,
          },
        },
      }
    )
    .toArray();
}

function middlewareIsUserExists() {
  return (req, res, next) => {
    if (!req.user.uid) {
      req.user.uid = null;
      return res.sendStatus(401);
    }
    next();
  };
}

function userCanVote(ids, userId) {
  return userId && !ids.includes(userId);
}

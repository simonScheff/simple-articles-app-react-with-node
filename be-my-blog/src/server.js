import express from "express";
import {  db, connectToDB} from './db.js';
// import articles from "../../my-blog/src/pages/article-content";
const app = express();
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/api/articles/:articleName', async (req, res) => {
  const { articleName } = req.params ;
  const article = await getArticle(articleName);

  article ? res.json(article) : res.sendStatus(404);
});

app.get('/api/articles', async (req, res) => {
  const articles = await getAllArticles();
  articles ? res.json(articles) : res.sendStatus(404);
});

app.put("/api/articles/:articleName/upvote", async(req, res) => {
  const { articleName } = req.params;
    await db.collection('articles').updateOne({name: articleName}, {
      $inc: {upvotes: 1}
    });

    const article = await getArticle(articleName);
    article ? res.send(article) : res.send("Failed");
});

app.post("/api/articles/:articleName/comments", async (req, res) => {
  const comments = req.body;
  const { articleName } = req.params;
  await db.collection('articles').updateOne({name: articleName}, {
    $push: {comments}
  });
  const article = await getArticle(articleName);
  article ? res.send(article) : res.send("Failed");
});

app.listen(8000, async() => {
  console.log("server is listening on port 8000");
  await connectToDB();
});


 async function getArticle(articleName) {
  return await db.collection('articles').findOne({name: articleName})
}

async function getAllArticles() {
  return await db.collection('articles').find({}, {
    projection: {_id: 0, title: 1, name: 1, content: {
      $slice: 1
    }}}).toArray();
}

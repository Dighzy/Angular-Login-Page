require('dotenv').config();

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const errorController = require('./controllers/error');
const express = require("express");

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

 app.use('/auth', authRoutes);

app.use('/post', postsRoutes);

// app.use(errorController.get404);

app.use(errorController.get500);

const cors = require("cors");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [ { role: "user", content: message }],
  });

  const reply = completion.choices[0].message.content;

  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

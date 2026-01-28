import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

/* AUTH TOKEN */
app.use((req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = auth.split(" ")[1];
  if (token !== process.env.GPT_SECRET_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
});

/* SEARCH */
app.get("/search", async (req, res) => {
  const q = req.query.q;
  const num = req.query.num || 5;

  if (!q) return res.status(400).json({ error: "Query kosong" });

  try {
    const url = new URL("https://www.googleapis.com/customsearch/v1");
    url.searchParams.set("key", process.env.GOOGLE_API_KEY);
    url.searchParams.set("cx", process.env.GOOGLE_CX);
    url.searchParams.set("q", q);
    url.searchParams.set("num", num);

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Gagal ambil data Google" });
  }
});

app.listen(process.env.PORT || 3000);

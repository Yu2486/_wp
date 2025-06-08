import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("test.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT,time TEXT,body TEXT)");

const data = [
    { title: "super man",time:"2025-02-15", body: "nobody care" },
    { title: "Wonder woman", time:"2023-09-23",body: "nobody care" },
    { title: "the flash", time:"2015-07-16",body: "nobody care" },
  ];


  for (const post of data) {
    db.query(
      "INSERT INTO posts (title, time, body) VALUES (?, ?, ?)",
      [post.title, post.time, post.body]
    );
  }


  for (const [id, title, time, body] of db.query("SELECT id, title, time, body FROM posts")) {
    console.log(`ID: ${id}, Title: ${title}, Time: ${time}, Body: ${body}`);
  }
db.close();

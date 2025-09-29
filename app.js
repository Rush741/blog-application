import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy } from "passport-local";
import "dotenv/config";

const port = 3000;
const saltRounds = 10;
const app = express();

const db = new pg.Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});
db.connect();

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));


//client requests
app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM blogs ORDER BY created_at DESC;");
        let posts = result.rows;
        res.render("home.ejs", {
            posts: posts,
        });
    } catch (err) {
        console.error(err);
        res.send("Error fetching posts");
    }
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const checkUsername = await db.query("SELECT * FROM users WHERE username=$1", [req.body.username]);
        const checkEmail = await db.query("SELECT * FROM users WHERE email=$1", [req.body.email]);
        if(checkUsername.rows.length > 0 || checkEmail.rows.length > 0) {
            console.log("Needed unique username and email");
            res.redirect("/register");
        } else {
            bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
                if(err) {
                    console.log(err);
                } else {
                    const result = await db.query("INSERT INTO users(username, email, password_hash, is_verified) VALUES($1, $2, $3, true) RETURNING *;", [req.body.username, req.body.email, hash])
                    const user = result.rows[0];
                    // req.login(user, (err)=> {
                    //     console.log("logged in successfully");
                    //     res.redirect("/");
                    // })
                }
            })
        }

    } catch(err) {
        console.log(err);
    }
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    try {
        if(!title.trim() || !content.trim()) {
            return res.status(400).send("Title and content cannot be empty.")
        }
        await db.query("INSERT INTO blogs(title, content, author_id) VALUES ($1, $2, 1);", [title, content]);// TEMPORARY FIX BY SAYING AUTHOR_ID AS 1 FOR EVERY BLOG
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error creating post");
    }
});

app.get("/posts/:id", async (req, res) => {
    const postId = Number(req.params.id);
    try {
        const result = await db.query("SELECT * FROM blogs WHERE id = $1", [postId]);
        const post = result.rows[0];
        if (result.rows.length > 0) {
            res.render("post.ejs", {
                post: post,
            });
        }
        else {
            res.status(404).render("404.ejs", {
                message: "Post not found!",
            });
        }
    } catch (err) {
        console.error(err);
        res.send("Error fetching post");
    }
});

app.get("/edit/:id", async (req, res) => {
    const postId = Number(req.params.id);
    try {
        const result = await db.query("SELECT * FROM blogs WHERE id = $1", [postId]);
        const post = result.rows[0];
        if(result.rows.length > 0) {
            res.render("edit.ejs", {
                post: post,
            });
        }
        else {
            res.status(404).render("404.ejs", {
                message: "Post not found!",
            });
        }
    } catch (err) {
        console.error(err);
        res.send("Error loading post");
    }
});

app.post("/edit/:id", async (req, res) => {
    const postId = Number(req.params.id);
    try {
        const result = await db.query("SELECT * FROM blogs WHERE id = $1;", [postId]);
        if(result.rows.length > 0) {
            await db.query("UPDATE blogs SET title = $1, content = $2 WHERE id = $3;", [req.body.title, req.body.content, postId]);
        }
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error updating post");
    }
});

app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM blogs WHERE id = $1", [id]);
        res.redirect("/");
    } catch {
        console.error(err);
        res.send("Error deleting post");
    }
});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}...`);
});

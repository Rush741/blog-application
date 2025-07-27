import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));

let posts = [];
let postId = 1;

//client requests
app.get("/", (req, res) => {
    res.render("home.ejs", {
        posts: posts,
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const {title, content} = req.body;

    if(!title.trim() || !content.trim()) {
        return res.status(400).send("Title and content cannot be empty.")
    }
    const post = {
        id: postId++,
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render("post.ejs", {
            post: post,
        });
    }
    else {
        res.status(404).render("404.ejs", {
            message: "Post not found!",
        })
    }
});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}...`);
});

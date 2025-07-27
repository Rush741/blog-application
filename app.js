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
    const post = {
        id: postId++,
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(post);
    res.redirect("/");
});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}...`);
});

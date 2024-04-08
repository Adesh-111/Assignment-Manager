import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let previousData = {};

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/submit", (req, res) => {
    let data = {
        name: req.body["name"],
        email: req.body["email"],
        topic: req.body["topic"],
        content: req.body["content"],
    };
    previousData = data;
    res.render("newindex.ejs", data);
});

app.get("/update", (req, res) => {
    res.render("update.ejs", { data: previousData });
});

app.post("/update", (req, res) => {
    let updatedData = {
        name: req.body["name"],
        email: req.body["email"],
        topic: req.body["topic"],
        content: req.body["content"]
    };
    previousData = updatedData;
    res.render("update.ejs", { data: updatedData });
});

app.get("/delete", (req, res) => {
    previousData = {};
    res.render("delete.ejs", { data: previousData });
});


app.listen(port, () => {
    console.log("Listening on port 3000");
});

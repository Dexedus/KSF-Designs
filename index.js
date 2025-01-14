import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.get("/pricing", (req, res) => {
    res.render("pricing.ejs")
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
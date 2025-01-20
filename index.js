import express from "express";
import bodyParser from "body-parser";
import sgMail from '@sendgrid/mail';
import 'dotenv/config';


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Important Values
const API_KEY = process.env.SEND_GRID_KEY
const SendgridSender = process.env.EMAIL


// Send Grid Email Function
sgMail.setApiKey(`${API_KEY}`)

const sendEmail = async (toEmail, subject, message) => {
    const msg = {
      to: toEmail,
      from: `${SendgridSender}`, // Verified SendGrid sender email
      subject: subject,
      html: message,
    };
  
    // Send the email via SendGrid
    try {
        await sgMail.send(msg);
        console.log(`Email sent successfully to ${toEmail}`);
      } catch (error) {
        console.error('Error sending email:', error.response?.body || error.message);
      }
    };




// GET Requests
app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.get("/pricing", (req, res) => {
    res.render("pricing.ejs")
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.get("/web", (req, res) => {
    res.render("web-design.ejs")
})

app.get("/addOns", (req, res) => {
    res.render("addOns.ejs")
})

app.get("/futureServices", (req, res) => {
    res.render("futureServices.ejs")
})

app.get("/recentPersonal", (req, res) => {
    res.render("recentpersonal.ejs")
})

app.get("/recentClient", (req, res) => {
    res.render("recentclient.ejs")
})






// Contact Form Submission Handling
app.post("/submitContact", (req, res) => {

    //Re-render the page
    res.render("pricing.ejs");

    //Get the input values
    const email = req.body.email;
    const number = req.body.number;

    //Send the email to my business account.
    sendEmail("ksfwebdesigns@gmail.com", "New Customer Query", `New Customer<br>Email: ${email}<br>Phone Number: ${number}`)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
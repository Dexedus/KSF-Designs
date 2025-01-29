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

app.get("/fullPackage", (req, res) => {
    res.render("product.ejs", {
        title: "Web Design Full Package",
        summary: "The main advantages of this comprehensive package over the standard 'Web Design' package include lifetime coverage for maintenance costs, a website with up to 6 pages, a more affordable monthly fee instead of a large upfront payment, and an initial SEO setup to boost your site's visibility and ranking on Google.",
        price: "€100",
        mo: "/mo",
        feature1Title: "No Starting Fee",
        feature2Title: "Initial SEO Setup",
        feature3Title: "Peace of Mind",
        feature1Info: "Only start paying from the date the website goes live.",
        feature2Info: "Give your website a boost on Google rankings. Continued maintenance of SEO is an optional paid add-on.",
        feature3Info: "Never worry about maintenance, hosting or third party costs.",
        postAddress: "'/submitFullPackage'"
    })
})

app.get("/webDesign", (req, res) => {
    res.render("product.ejs", {
        title: "Web Design",
        summary: "This is best for businesses who might want to have more complex features on their website. With a backend server, I can use API's to make your website do some pretty cool things. Maybe you want to handle client bookings and send them automated emails? It's all possible with this plan. Please note, hosting and maintenance are free for the first year. After this, I charge hourly for maintenance and 20/mo for hosting.",
        price: "€325",
        mo: "",
        feature1Title: "Your Business Online",
        feature2Title: "Save customer time",
        feature3Title: "Less Worries",
        feature1Info: "Complex features with up to 5 pages. Bring your customers to your digital reception.",
        feature2Info: "Allow customers to book and pay through your fast loading, stylish website.",
        feature3Info: "Hosting and maintencance is covered for the first year.",
        postAddress: "'/submitWebDesign'"
    })
})

app.get("/staticWebsite", (req, res) => {
    res.render("product.ejs", {
        title: "Static Website",
        summary: "This is most suitable for the businesses who just want a simple website made fast to show business information, photos of their work, contact infomration etc... It will look professional and stylish, generating interesting in any potential customer who visits.",
        price: "€200",
        mo: "",
        feature1Title: "Made Fast",
        feature2Title: "Show Off Your Work",
        feature3Title: "Changes are instant",
        feature1Info: "First draft done in 5 days or less. If you're happy with it, we launch it right away. Additional drafts are free.",
        feature2Info: "Include photos or videos of your work to accompany the other static info your site may have.",
        feature3Info: "Because your site is not hosted on a backend server, updates to your site push immediately.",
        postAddress: "'/submitStaticWebsite'"
    })
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
app.post("/submitQuery", (req, res) => {

    //Re-render the page
    res.render("contact.ejs");

    //Get the input values
    const email = req.body.email;
    const number = req.body.number || "No Number";
    const query = req.body.message

    //Send email to customer
    sendEmail(email, "Thank you for contacting us", "Hello there,<br><br>We have recieved your query and will be in touch with you as soon as possible.<br>Thanks for reaching out!<br><br>Regards,<br>KSF Web-Design")


    //Send the email to my business account.
    sendEmail("ksfwebdesigns@gmail.com", "New Customer Query", `New Customer<br>Email: ${email}<br>Phone Number: ${number}<br>Message: ${query}`)
})


// Contact Form Submission Handling
app.post("/submitWebDesign", (req, res) => {

    //Re-render the page
    res.render("pricing.ejs");

    //Get the input values
    const email = req.body.email;
    const number = req.body.number;

    sendEmail(email, "Thank you for contacting us", "Hello there,<br><br>This is an automated response email. I will get back to you as soon as possible with information on how to move forward. In the meantime, it would be great if you could reply to this email with answers to the following questions. Thanks!<br><br><b>Question 1</b><br>What's your name, or the name of the person I will primarily be in communication with?<br><br><b>Question 2</b><br>What services do you provide at your business? (The more details you can provide the better)<br><br><b>Question 3</b><br>What fucnionality would you like your website to have? For example, would you like to handle stripe payments, or have customers book appointments? Or do you simply just want to have static information for customers to see.<br>If you don't reply with answers to these questions, I will still reach out as soon as possible, so don't worry if you don't want to answer right now.<br><br>Thanks for choosing KSF.<br><br>Regards,<br>KSF Web-Design")


    //Send the email to my business account.
    sendEmail("ksfwebdesigns@gmail.com", "New Customer Query from the about my product page", `New Customer<br>Email: ${email}<br>Phone Number: ${number}<br><br>Email should have been sent to them with questionarie`)
})

// Contact Form for full package
app.post("/submitFullPackage", (req, res) => {

    //Re-render the page
    res.redirect("/fullPackage")

    //Get the input values
    const email = req.body.email;
    const number = req.body.number;

    sendEmail(email, "Thank you for contacting us", "Hello there,<br><br>This is an automated response email.<br>Thanks for showing interest in our Web Design Full Package.<br>I will get back to you as soon as possible. with information on how to move forward. In the meantime, it would be great if you could reply to this email with answers to the following questions. Thanks!<br><br><b>Question 1</b><br>What's your name, or the name of the person I will primarily be in communication with?<br><br><b>Question 2</b><br>What services do you provide at your business? (The more details you can provide the better)<br><br>If you don't reply with answers to these questions, I will still reach out as soon as possible, so don't worry if you don't want to answer right now.<br><br>Thanks for choosing KSF.<br><br>Regards,<br>KSF Web-Design")


    //Send the email to my business account.
    sendEmail("ksfwebdesigns@gmail.com", "New Customer Query from the Full Package page", `New Customer<br>Email: ${email}<br>Phone Number: ${number}<br><br>Email should have been sent to them with questionarie`)
})


// Contact Form for web design
app.post("/submitWebDesign", (req, res) => {

    //Re-render the page
    res.redirect("/webDesign");

    //Get the input values
    const email = req.body.email;
    const number = req.body.number;

    sendEmail(email, "Thank you for contacting us", "Hello there,<br><br>This is an automated response email.<br>Thanks for showing interest in our Web Design package.<br>I will get back to you as soon as possible with information on how to move forward. In the meantime, it would be great if you could reply to this email with answers to the following questions. Thanks!<br><br><b>Question 1</b><br>What's your name, or the name of the person I will primarily be in communication with?<br><br><b>Question 2</b><br>What services do you provide at your business? (The more details you can provide the better)<br><br>If you don't reply with answers to these questions, I will still reach out as soon as possible, so don't worry if you don't want to answer right now.<br><br>Thanks for choosing KSF.<br><br>Regards,<br>KSF Web-Design")


    //Send the email to my business account.
    sendEmail("ksfwebdesigns@gmail.com", "New Customer Query from the Web Design page", `New Customer<br>Email: ${email}<br>Phone Number: ${number}<br><br>Email should have been sent to them with questionarie`)
})


// Contact Form for static site
app.post("/submitStaticWebsite", (req, res) => {

    //Re-render the page
    res.redirect("/staticWebsite")

    //Get the input values
    const email = req.body.email;
    const number = req.body.number;

    sendEmail(email, "Thank you for contacting us", "Hello there,<br><br>This is an automated response email.<br>Thanks for showing interest in our Static Website package.<br>I will get back to you as soon as possible with information on how to move forward. In the meantime, it would be great if you could reply to this email with answers to the following questions. Thanks!<br><br><b>Question 1</b><br>What's your name, or the name of the person I will primarily be in communication with?<br><br><b>Question 2</b><br>What services do you provide at your business? (The more details you can provide the better)<br><br>If you don't reply with answers to these questions, I will still reach out as soon as possible, so don't worry if you don't want to answer right now.<br><br>Thanks for choosing KSF.<br><br>Regards,<br>KSF Web-Design")


    //Send the email to my business account.
    sendEmail("ksfwebdesigns@gmail.com", "New Customer Query from the Static Website page", `New Customer<br>Email: ${email}<br>Phone Number: ${number}<br><br>Email should have been sent to them with questionarie`)
})





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
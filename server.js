const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(process.env.port || 4000, () => console.log("server is running on port 4000"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send");
  }
});

router.get("/contact", (req, res) => {
  res.send("Contacts endpoint is working!");
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: name,
    to: process.env.EMAIL_USER,
    subject: "Contact Form Submission - Drawing Website",
    html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message sent" });
    }
  });
});

router.post("/commission", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const medium = req.body.medium;
  const size = req.body.size;
  const description = req.body.description;
  const inquiries = req.body.inquiries;
  const mail = {
    from: name,
    to: process.env.EMAIL_USER,
    subject: "Commission Form Submission - Drawing Website",
    html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Medium: ${medium}</p>
               <p>Size: ${size}</p>
               <p>Description: ${description}</p>
               <p>Further Inquiries: ${inquiries}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message sent" });
    }
  });
});

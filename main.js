var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");
var fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Route for Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Home.html"));
});

// Route for login
app.post("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Thankyoupage.html"));
  const user = req.body.username;
  const passkey = req.body.password;
  console.log({ username: user, password: passkey });
});

// Route for sign-up form
app.get("/sign-up", (req, res) => {
  res.render("sign.ejs");
});

// Route for login page
app.get("/login", (req, res) => {
  res.render("index.ejs");
});

// Single POST route for handling sign-up form submission
app.post("/sign-up", (req, res) => {
  // Render the details.ejs page with form data
  res.render('details.ejs', {
    firstName: req.body.name,
    lastName: req.body.lname,
    email: req.body.email,
    Phone: req.body.phone,
    Password: req.body.password,
    confirmPassword: req.body.cpassword
  });

  // Create user data string to write to the file
  const userData = `{
    First Name: ${req.body.name}
    Last Name: ${req.body.lname}
    Email: ${req.body.email}
    Phone: ${req.body.phone}
    Password: ${req.body.password}
    Confirm Password: ${req.body.cpassword}
    
}`;

  // Write the user data to a file named 'details.txt'
  if(!"details.txt"){
    fs.writeFile("details.txt", userData, (err) => {
      
    });
  }
  else{
    fs.appendFile("details.txt",userData,(err)=>{
      if (err) {
        console.log("Error appending to file:", err);
      } else {
        console.log("User data successfully appended to details.txt");
      }
    })
  }
 
});

// Route for About page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// 404 Error page
app.use(function (req, res) {
  res.status(404).render("404page.ejs");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

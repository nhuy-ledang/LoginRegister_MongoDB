const express = require("express");
const app = express();
const path = require('path');
const hbs = require("hbs");



require("./db/conn");
const Register = require("./models/registers");
const exp = require("constants");
const { await } = require("await");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path))
// console.log(path.join(__dirname, "../public"));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)


app.get("/", (req, res)=>{
    // res.send("Hello");
    res.render("index")
});

app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
})


// create a new user in our database
app.post("/register", async (req, res)=>{
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if(password === confirmpassword){
            const registerEmployee = new Register({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: password,
                confirmpassword: confirmpassword,
                address: req.body.address
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");
            console.log(registerEmployee);
            res.redirect("/login")
        }
        else{
            res.send("passwords are not matching")
        }

    }  catch(error){
        res.status(400).send(error);
    }
})





// login check
app.post("/login", async(req, res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        // console.log(`Username is ${username} and password is ${password}`)
        const user_username = await Register.findOne({username:username});
        // res.send(user_username.password);
        // console.log(user_username);
        if(user_username.password === password){
            res.status(201).render("index");
        }
        else{
            // res.send("Invalid Login Details");
            alert("Invalid Login Details");
        }

    } catch (error) {
        res.status(400)
        alert("Invalid Login Details");
        // res.status(400).send("Invalid Login Details")
    }
})


app.get("/forgot-password", (req, res)=>{
    res.render("forgot-password");
})


app.post("/forgot-password", async(req, res)=>{
    try {
        const username = req.body.username;
        const newPassword = req.body.newPassword;

        const user = await Register.findOne({username:username});
        if(!user){
            alert("User not found");
        }
        else{
            user.password = newPassword;
            await user.save();
            alert("Password updated successfully");
        }
    } catch (error) {
        res.status(400)
        alert("Something went wrong. Please try again later");
    }
})

app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);
});
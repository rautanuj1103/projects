// All 3 packets are used in this projects
// mongoose
// exprees
// .env 
import exprees from "express";
import cors from 'cors'
import cookieParser from "cookie-parser"
const app=exprees();
app.use(cors({
    //This tells the server which website is allowed to send requests.
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// express.json() —
// This built-in middleware in Express helps your app understand JSON data coming in from the client
app.use(exprees.json({
    limit:"16kb"//This sets a maximum size for the incoming JSON data
}))


//This middleware helps your app read form data — the kind that comes from HTML forms (like when you submit <form> on a webpage).
app.use(exprees.urlencoded({
    extendend:true,limit:"16kb"}))

app.use(cookieParser())
app.use(exprees.static("public"))
export {app}//This tells Express to serve static files (like images, CSS, JavaScript, PDFs, etc.) from a folder named “public”.
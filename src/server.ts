import app from "./app";
import cors from "cors";




const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on Port: ${PORT}`)


} )
import app from "./app";
const cors = require('cors');


const PORT = process.env.PORT;
app.use(cors({"Access-Control-Allow-Origin":"*"}));
app.listen(PORT,()=>{
    console.log(`Server is running on Port: ${PORT}`)


} )
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRotes.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRoute.js"


const app = express()
const port = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://localhost:5174"
];



//middleware
app.use(express.json())
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));



//dp connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)




app.get("/",(req,res)=>{
    res.send("API Working")

})

app.listen(port,()=>{
    // console.log(`Server Started on http://localhost:${port}`)
    console.log(`✅ Server started on port ${port}`);
})
//mongodb+srv://ishitasaxena437:pd4inc3ttMRlbvLy@cluster0.dlzzd.mongodb.net/?
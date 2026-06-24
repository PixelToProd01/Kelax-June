import express from "express";
import dotenv from "dotenv";
// import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// import AppError from "./utils/AppError.js";

// Import DB
import connectDb from "./config/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import productRouter from "./routes/product.routes.js";
import warrantyRouter from "./routes/warranty.routes.js";

// Import Routes
// import otpRoutes from "./routes/otp.routes.js";

// Environment Variable Setup
dotenv.config();

const app = express();
// const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

/* -------------------- SECURITY (TOP) -------------------- */
// app.use(helmet());

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// )

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ----------------- CORS  ----------------

app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// ---------- BODY PARSERS ----------  JSON limit (important) -----
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

//  ---------------   COOKIES  ----------------------------
app.use(cookieParser());

//  ---------------------- User Routes For Customer and Partners  -------------------
app.use("/api/auth", authRouter);

//  --------------------- Admin Login + Logout Routes and other Admin Routes ----------
app.use("/api/admin", adminRouter);

//  --------------------- For Create Product Route  ----------
app.use("/api/product", productRouter);

//  -------------------- Route For Warranty  -------------------
app.use('/api/warranty', warrantyRouter)

// app.use("/api/otp", otpRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Kelax Server is Running...");
});

/* -------------------- ROUTE NOT FOUND (IMPORTANT) -------------------- */
// app.all("*", (req, res, next) => {
//   next(new AppError(`Route ${req.originalUrl} not found`, 404));
// });

/* -------------------- ERROR HANDLER (LAST) -------------------- */
app.use(errorMiddleware);

// ---------------- Server Started -----------------
const startServer = async () => {
  try {
    await connectDb();

    // ✅ Start User Expiry Cron || ✅ CRON JOB START (YAHI SAHI JAGAH HAI)  ||  ✅ Import cron AFTER DB connect  ||
    await import("./cron/userExpiry.cron.js");

    // ✅ Start Warranty Expiry Cron
    await import("./cron/warrantyExpiry.cron.js")

    // server.listen(PORT, "0.0.0.0", () => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Kelax Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

startServer();

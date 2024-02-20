import express from "express";
import cors, { CorsOptions } from "cors";
import userRoutes from "./routes/userRoutes";
import setRoutes from "./routes/setRoutes";
import locationRoutes from "./routes/locationRoutes";

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const app = express();
app.use(express.json());

const allowedHosts = process.env.ALLOWED_HOSTS!.split(",");
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedHosts.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/sets", setRoutes);
app.use("/locations", locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

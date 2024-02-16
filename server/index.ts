import express from "express";
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

app.use("/users", userRoutes);
app.use("/sets", setRoutes);
app.use("/locations", locationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

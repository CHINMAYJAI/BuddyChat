import { app, PORT } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is listening at PORT: ${PORT}`);
});

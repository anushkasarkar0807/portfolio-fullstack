// Backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors()); // allow cross-origin requests
app.use(bodyParser.json()); // parse application/json

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI; // render env var
if (!MONGO_URI) {
  console.error("Missing MONGO_URI env var");
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", contactSchema);

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const doc = new Contact({ name, email, message });
    await doc.save();
    res.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.get("/", (req, res) => res.send("Hello from backend"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
import cors from "cors";

app.use(cors({
  origin: "https://anushkasarkar0807.github.io", 
  methods: ["POST", "GET"]
}));
import cors from "cors";

app.use(
  cors({
    origin: "https://anushkasarkar0807.github.io",
    methods: ["POST", "GET"],
  })
);

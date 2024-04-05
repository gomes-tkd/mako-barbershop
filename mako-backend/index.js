const conn = require('./db/conn');

const express = require('express');
const cors = require('cors');

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder for images
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routes/UserRoutes');
const CommentRoutes = require("./routes/CommentRoutes");
const GalleryRoutes = require("./routes/GalleryRoutes");
const SchedulingRoutes = require("./routes/SchedulingRoutes");

app.use("/user", UserRoutes);
app.use("/comment", CommentRoutes);
app.use("/gallery", GalleryRoutes);
app.use("/schedule", SchedulingRoutes);

app.listen(5000);

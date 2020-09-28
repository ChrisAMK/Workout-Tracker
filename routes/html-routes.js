const path = require("path");

export default (server) => {
    // HTML Routes
    // Sends the index.html file to the user when on the websites main page
    server.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Sends the exercise.html file to the user when on the browser sends a /exercise? get request
    server.get("/exercise?", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/exercise.html"));
    });

    // Sends the stats.html file to the user when on the browser sends a /stats get request
    server.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/stats.html"));
    });
}

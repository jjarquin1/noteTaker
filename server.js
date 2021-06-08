const express = require('express');
const path = require('path');
const fs = require('fs');
// server setup// 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))




app.get("/api/notes", (req, res) => {
    try {
        const notes_db = JSON.parse(fs.readFileSync("./db/db.json"));
        console.log(notes_db)
        return res.json(notes_db);
    }
    catch (error) {
        console.error(error);
    };
})

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = Date.now();
    console.log(newNotes);
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

app.delete("/api/notes/:id", (req,res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf-8"));
    const deleteNote = req.params.id;
    const newNotesArray = notes.filter(notes =>notes.id != deleteNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotesArray));
    res.send(newNotesArray);
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
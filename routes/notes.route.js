const { saveNotes, getNotes, updateNotes } = require("../controllers/notes.controller");
const router = require("express").Router();

router.post("/save-notes", saveNotes);

router.get("/get-notes/:token", getNotes);

router.put("/update-note", updateNotes);


module.exports = router;
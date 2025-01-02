const notes = require('../models/notes.model');
const jwt = require("jsonwebtoken");

module.exports.saveNotes = async (req, res) => {
    try {
        const { notesData, token } = req.body;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const saveNotes = await notes.findOneAndUpdate(
            { userId: decoded.id },
            { notes: notesData },
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, message: 'notes saved', saveNotes });
    } catch (error) {
        console.error('Error: ', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: false, message: 'Token expired' });
        }
        res.status(500).json({ success: false, message: 'Error saving notes, Please retry' });
    }
};

module.exports.updateNotes = async (req, res) => {
    try {
        const { notesData, token } = req.body;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const saveNotes = await notes.findOneAndUpdate(
            { userId: decoded.id },
            { notes: notesData },
        );
        res.status(200).json({ success: true, message: 'notes saved', saveNotes });
    } catch (error) {
        console.error('Error: ', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: false, message: 'Token expired' });
        }
        res.status(500).json({ success: false, message: 'Error saving notes, Please retry' });
    }
};


module.exports.getNotes = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const getNotes = await notes.findOne({ userId: decoded.id });
        res.status(200).json({
            success: true, message: 'notes saved', data: {
                notes: getNotes.notes
            }
        });
    } catch (error) {
        console.error('Error: ', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: false, message: 'Token expired' });
        }
        res.status(500).json({ success: false, message: 'Error saving notes, Please retry' });
    }
};

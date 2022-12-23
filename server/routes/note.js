const express = require('express');
const { Note } = require('../models/notemodel');
const { fetchuser } = require('../fetchuser/fetchuser');

const router = express.Router();


router.get('/getnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
})


router.post('/addnote', fetchuser, async (req, res) => {
    const { title, desc, tag } = req.body;
    if (!title || !desc || !tag) {
        success = false;
        return res.status(401).send({ success, error: "data not filled!" });
    }

    try {
        const newnote = new Note({
            title: title,
            desc: desc,
            tag: tag,
            user: req.user.id,
        })

        await newnote.save();
        success = true;
        res.status(201).send({ success, newnote });


    } catch (error) {
        console.log(error);
    }

})


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    let note = await Note.findById(req.params.id);
    if (!note) {
        success = false
        res.status(401).send({ success, error: `note with id: ${req.params.id} not found!` });
    }
    try {
        if (note.user.toString() != req.user.id) {
            success = false
            return res.status(401).send({ success, error: "not allowed!" });
        }

        let deletednote = await Note.findByIdAndDelete(req.params.id);
        success = true
        res.status(201).send({ success, message: `note with id: ${req.params.id} has been deleted!` });

    } catch (error) {
        console.log(error);
    }
})


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, desc, tag } = req.body;
    try {
        const newnote = {};
        if (title) { newnote.title = title };
        if (desc) { newnote.desc = desc };
        if (tag) { newnote.tag = tag };

        const note = await Note.findById(req.params.id);
        if (!note) {
            success = false
            return res.status(401).send({ success, error: `note with id: ${req.params.id} not found!` });
        }

        if (note.user.toString() != req.user.id) {
            success = false
            return res.status(401).send({ success, error: "not allowed!" });
        }

        const updatednote = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json(updatednote);

    } catch (error) {
        console.log(error);
    }

})


module.exports = { routes: router };
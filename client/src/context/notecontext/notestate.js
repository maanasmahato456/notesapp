import React, { useState } from 'react';
import NoteContext from './notecontext';
import axios from 'axios';
const NoteState = (props) => {
    let randomNumber  = Math.random();

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    let finalNotes = [];
    const [notes, setnotes] = useState(finalNotes);

    const axiosPost = axios.create({
        headers: {
            "auth-token": localStorage.getItem('auth-token')
        }
    })

    const GetNotes = async () => {
        const res = await axiosPost.get('/note/getnotes')
        /*.then((res) => setnotes(res.data))
        .catch(err => console.log(err))*/
        setnotes(res.data);
    }

    const AddNote = async (title, desc, tag) => {
        const data = {
            title: title,
            desc: desc,
            tag: tag
        }

        await axiosPost.post('/note/addnote', data);

        /*await fetch('/note/addnote', {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify(formdata)
        });*/

        const note = {
            "_id": randomNumber,
            "user": randomNumber,
            "title": title,
            "desc": desc,
            "tag": tag,
            "date": date,
            "time": time,

        }
        setnotes(notes.concat(note));
    }

    const DeleteNote = async (id) => {
        const response = await fetch(`/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            }
        })
        const json = await response.json();
        console.log(json);

        const deletednote = notes.filter((note) => { return note._id !== id });

        setnotes(deletednote);
    }

    const UpdateNote = async (id, title, desc, tag) => {
        const response = await fetch(`note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, desc, tag })
        })
        const json = response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].desc = desc;
                newNotes[index].tag = tag;
                break;
            }
        }

        setnotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, GetNotes, AddNote, DeleteNote, UpdateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
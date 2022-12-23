import React, { useState, useEffect, useContext, useRef } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import NoteContext from '../../context/notecontext/notecontext';
import Noteitem from '../layouts/noteitem';
import { useHistory } from 'react-router-dom';
const Home = () => {
    const context = useContext(NoteContext);
    const { notes, AddNote, GetNotes, UpdateNote } = context;
    const [title, settitle] = useState();
    const [desc, setdesc] = useState();
    const [tag, settag] = useState();
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            GetNotes();
        }
        else {
            history.push('/signup');
        }
        // eslint-disable-next-line
    }, [])

    const submitData = (e) => {
        e.preventDefault();
        AddNote(title, desc, tag);
        settitle();
        setdesc();
        settag();
    }



    // updating note functions 

    const [enote, setenotes] = useState({ id: "", etitle: "", edesc: "", etag: "" });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openRef = useRef(null);
    const closeRef = useRef(null);

    const updatenote = (currentNote) => {
        openRef.current.click();
        setenotes({
            id: currentNote._id,
            etitle: currentNote.title,
            edesc: currentNote.desc,
            etag: currentNote.tag
        })
    }

    const onUpdateChange = (f) => {
        setenotes({ ...enote, [f.target.name]: f.target.value })
    }

    const submitUpdatedData = () => {
        UpdateNote(enote.id, enote.etitle, enote.edesc, enote.etag);
        closeRef.current.click();
    }


    return (
        <div className=" container">
            <div className="text-center">
                <h1>Welcome to MyNoteBook</h1>
                <p>You can write a note or multiple notes and save it in this app for future use.</p>
            </div>
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" id="title" type="text" placeholder="Enter title" value={title || ''} onChange={(e) => settitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="desc" id="desc" as="textarea" value={desc || ''} rows={5} onChange={(e) => setdesc(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control name="tag" id="tag" type="text" placeholder="Enter Tag" value={tag || ''} onChange={(e) => settag(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={submitData}>
                        Submit
                    </Button>
                </Form>
            </div>

            <div>
                <div variant="primary" ref={openRef} onClick={handleShow} />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="etitle" id="etitle" type="text" placeholder="Enter title" value={enote.etitle} onChange={onUpdateChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="edesc" id="edesc" as="textarea" rows={5} value={enote.edesc} onChange={onUpdateChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control name="etag" id="etag" type="text" placeholder="Enter Tag" value={enote.etag} onChange={onUpdateChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" ref={closeRef} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitUpdatedData}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


            <div className="my-4 mx-auto align-items-center mx-auto">
                <h1>All notes</h1>
                <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3  lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4  mx-auto">
                    {notes.map((data) => {
                        return (
                            <Noteitem className="" key={data._id} note={data} updatenote={updatenote} />
                        )
                    })}
                </div>
            </div >

        </div>
    )
}

export default Home;

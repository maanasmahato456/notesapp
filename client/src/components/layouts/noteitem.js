import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import NoteContext from '../../context/notecontext/notecontext';

const Noteitem = (props) => {
    const { note, updatenote } = props;
    const context = useContext(NoteContext);
    const { DeleteNote } = context;
    return (
        <div>
            <Card className="container rounded-lg shadow-lg" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Title: {note.title}</Card.Title>
                    <Card.Title>Tag: {note.tag}</Card.Title>
                    <Card.Text>
                        Description:  {note.desc}
                    </Card.Text>
                    <Card.Text>
                        Submitted on {note.date} at {note.time}.
                    </Card.Text>
                    <div>
                        <Button className=" mx-2" variant="primary" onClick={() => { updatenote(note) }} >Update</Button>
                        <Button className=" mx-2" variant="primary" onClick={() => { DeleteNote(note._id) }}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Noteitem;

import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [data, setdata] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeRef = useRef();

    const history = useHistory();

    useEffect(() => {
        handleShow();
    }, [])

    const onchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const submitdata = async (e) => {
        e.preventDefault();
        const response = await fetch('/auth/adduser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await response.json()
        closeRef.current.click();
        if (json.success) {
            history.push('/login');
        }
        else {
            alert('invalid credentials or user already exists!');
        }
    }

    return (
        <div>
            <div variant="primary" onClick={handleShow} />
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>SignUp New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" id="name" type="text" placeholder="name" onChange={onchange} minLength={5} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" id="email" type="email" placeholder="Enter email" onChange={onchange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" id="password" type="password" placeholder="Password" onChange={onchange} minLength={8} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitdata}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={() => { history.push('/login') }}>
                        Already have an account? Click me.
                    </Button>
                    <Button variant="secondary" ref={closeRef} onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Signup;

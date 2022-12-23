import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [data, setdata] = useState();
    const [show, setShow] = useState(false);

    const closeRef = useRef();

    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        handleShow();
    }, [])


    const onchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const submitdata = async (e) => {
        const response = await fetch('/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();

        closeRef.current.click();

        if (json.success) {
            localStorage.setItem('auth-token', json.authtoken);
            history.push('/');
            window.location.reload(false);
        }
        else {
            alert('ERROR: User not found!');
            window.location.reload(false);
        }
    }

    return (
        <div>
            <div variant="primary" onClick={handleShow} />
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Login User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" id="email" type="email" placeholder="Enter email" onChange={onchange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" id="password" type="password" placeholder="Password" onChange={onchange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitdata}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={() => { history.push('/signup') }}>
                        Don't have an account? Click me.
                    </Button>
                    <Button variant="secondary" ref={closeRef} onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Login;

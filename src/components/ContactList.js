import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import './App.css';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    if (resultsRef.current) {
      // Scroll to the bottom of the list when contacts change
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [contacts]);

  const addContact = () => {
    if (name && email) {
      const newContact = { name, email };
      setContacts([...contacts, newContact]);
      setName("");
      setEmail("");
    }
  };

  const deleteContact = (index) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact, i) => i !== index)
    );
  };

  useEffect(() => {
    if (resultsRef.current) {
      const resultsHeight = resultsRef.current.clientHeight;
      if (resultsHeight > 200) {
        resultsRef.current.classList.add("scrollable");
      } else {
        resultsRef.current.classList.remove("scrollable");
      }
    }
  }, [contacts]);

  return (
    <div className="form">
      <Form className="name_email">
        <Form.Group className="mb-3" controlId="Form.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="name_input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            className="email_input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button onClick={addContact} type="button">
          Add
        </Button>
      </Form>
      {contacts.length > 0 && (
        <section className="lists">
          <div className="results" ref={resultsRef}>
            {contacts.map((contact, index) => (
              <div
                className={`index fade-in ${contact.deleted ? "fade-out" : ""}`}
                key={index}
              >
                <div className="result_name">
                  <span className="initial">
                    {contact.name.charAt(0)}
                    {contact.name.split(" ")[1]
                      ? contact.name.split(" ")[1].charAt(0)
                      : ""}
                  </span>
                  <span>{contact.name}</span> -
                </div>
                <span className="result_email">{contact.email}</span>{" "}
                <i
                  onClick={() => deleteContact(index)}
                  className="fa-solid fa-trash-can"
                ></i>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

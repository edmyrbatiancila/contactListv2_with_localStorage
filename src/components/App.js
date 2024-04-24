import React from 'react';
import { Text} from '@radix-ui/themes';
import { Container } from 'react-bootstrap';
import ContactList from './ContactList';
import './App.css';

export default function App() {
    return (
      <Container>
        <section className="contact">
          <main className="contact_form">
            <Text>
              <h1>Contact List</h1>
              <ContactList />
            </Text>
          </main>
        </section>
      </Container>
    );
} 
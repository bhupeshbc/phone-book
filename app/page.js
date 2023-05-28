"use client"

import { useState } from 'react';
import './App.css'; // Add this line to import the App.css file
import './Components/Contacts.css'; // Add this line to import the Contacts.css file
import Contacts from './components/contacts';

// Rest of the code...


const Page = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Achyut Timsina",
      phone: "9841414243"
    },
    {
      id: 2,
      name: "Kiran Rana",
      phone: "9841103035"
    },
    {
      id: 3,
      name: "Shankar Shrestha",
      phone: "9821232425"
    }
  ]);

  const addContact = (name, phone) => {
    const newContact = {
      id: contacts.length + 1,
      name,
      phone
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (id, newName, newPhone) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, name: newName, phone: newPhone } : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const searchContacts = (searchTerm) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="app">
      <h1>Phone Book</h1>
      <Contacts
        contacts={searchContacts('')}
        addContact={addContact}
        updateContact={updateContact}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default Page;

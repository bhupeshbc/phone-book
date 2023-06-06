"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import Contacts from './Components/Contacts';
import './Components/Contacts.css';

const Page = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/notes')
      .then(response => {
        console.log(response);
        setContacts(response.data.notes);
      })
      .catch(error => {
        console.error(error); 
      });
  }, []);

  return (
    <div className="app">
      <h1 style={{ color: "red"}}>Phone Book</h1>
      <Contacts contacts={contacts} />
    </div>
  );
};

 
export default Page;

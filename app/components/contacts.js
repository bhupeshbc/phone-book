import axios from 'axios';
import { useEffect, useState } from 'react';

import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredContacts = showAll ? contacts : contacts.filter(contact => contact.important === true);

  const addContact = () => {
    const newContact = {
      name: name,
      phone: phone,
      important: false, // Modify as per your requirements
    };

    axios.post('/api/contacts', newContact)
      .then(response => {
        setContacts([...contacts, response.data]);
        setName('');
        setPhone('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editContact = (contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
  };

  const updateContact = () => {
    axios.put(`/api/contacts/${editingContact.id}`, {
      name: name,
      phone: phone,
      important: editingContact.important, // Preserve the important flag
    })
      .then(response => {
        const updatedContacts = contacts.map(contact => {
          if (contact.id === editingContact.id) {
            return response.data;
          }
          return contact;
        });
        setContacts(updatedContacts);
        setEditingContact(null);
        setName('');
        setPhone('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteContact = (id) => {
    axios.delete(`/api/contacts/${id}`)
      .then(response => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="contacts">
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show Important' : 'Show All'}
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              <td>
                {contact.id === editingContact?.id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                ) : (
                  contact.name
                )}
              </td>
              <td>
                {contact.id === editingContact?.id ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                ) : (
                  contact.phone
                )}
              </td>
              <td>
                {contact.id === editingContact?.id ? (
                  <div>
                    <button onClick={updateContact}>Save</button>
                    <button onClick={() => setEditingContact(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => editContact(contact)}>Edit</button>
                    <button onClick={() => deleteContact(contact.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-contact">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
    </div>
  );
};

export default Contacts;

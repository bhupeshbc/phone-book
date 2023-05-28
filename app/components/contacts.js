import { useState } from 'react';
import './Contacts.css'; // Update the import path

const Contacts = ({ contacts, addContact, updateContact, deleteContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  const handleAddContact = () => {
    addContact(name, phone);
    setName('');
    setPhone('');
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
  };

  const handleUpdateContact = () => {
    updateContact(editingContact.id, name, phone);
    setEditingContact(null);
    setName('');
    setPhone('');
  };

  return (
    <div className="contacts">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
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
                    <button onClick={handleUpdateContact}>Save</button>
                    <button onClick={() => setEditingContact(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEditContact(contact)}>Edit</button>
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
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
    </div>
  );
};

export default Contacts;

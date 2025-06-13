import React, { useEffect, useState } from "react";
import { getContacts } from "../lib/contactService";
import { Link } from "react-router-dom";
import { getInitials } from "../utils";
import { Contact2, Plus, PlusCircleIcon } from "lucide-react";

function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl flex justify-center font-bold mb-4">
        Address Book
      </h1>
      {contacts.length > 0 && (
        <Link
          to="/add"
          className="flex items-center text-blue-500 hover:underline mb-4 gap-1"
        >
          <Plus className="w-4 h-4" />
          <p>Add New Contact</p>
        </Link>
      )}

      {contacts.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex-col text-center">
            <Contact2 className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
            <p className="text-lg">No contacts found.</p>
            <p className="text-lg">Start by adding a new contact!</p>
            <Link
              to="/add"
              className="mt-4 flex justify-center text-xl px-4 py-2 rounded"
            >
              <PlusCircleIcon className="w-8 h-8 inline-block mr-2" />
              <p>Add Contact</p>
            </Link>
          </div>
        </div>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="w-full flex gap-4 p-4 border rounded-lg shadow items-start"
          >
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">
                  {getInitials(contact.name)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-sm text-gray-200">{contact.phone}</p>
              <Link
                to={`/contact/${contact.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

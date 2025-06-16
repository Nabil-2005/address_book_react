import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteContact, getContactById } from "../lib/contactService";
import { getInitials } from "../utils";
import {
  ArrowLeft,
  Edit,
  Mail,
  MapPin,
  Phone,
  Trash,
  User,
} from "lucide-react";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      const data = await getContactById(id);
      if (!data) {
        alert("Contact not found");
        navigate("/");
      } else {
        setContact(data);
      }
    }
    fetchContact();
  }, [id, navigate]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold flex justify-center mb-10">
        Contact Details
      </h1>
      {contact.avatar ? (
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-5xl font-bold text-gray-800">
            {getInitials(contact.name)}
          </span>
        </div>
      )}
      <div className="p-6 space-y-6 mt-4">
        <div className="flex items-center space-x-4">
          <User className="w-10 h-10" />
          <div className="space-y-1">
            <p className="font-bold">Name</p>
            <p>{contact.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="w-10 h-10" />
          <div className="space-y-1">
            <p className="font-bold">Phone</p>
            <p>{contact.phone}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="w-10 h-10" />
          <div className="space-y-1">
            <p className="font-bold">Email</p>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="w-10 h-10" />
          <div className="space-y-1">
            <p className="font-bold">Address</p>
            <p>{contact.address}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="mt-4 py-2 px-4 rounded-full"
        >
          <div className="flex items-center justify-center gap-1">
            <ArrowLeft />
            <p>Back</p>
          </div>
        </button>
        <button
          onClick={() => navigate(`/edit/${contact.id}`)}
          className="mt-4 py-2 px-4 rounded-full"
        >
          <div className="flex items-center justify-center gap-1">
            <Edit />
            <p>Edit</p>
          </div>
        </button>
        <button
          onClick={async () => {
            if (
              window.confirm("Are you sure you want to delete this contact?")
            ) {
              await deleteContact(contact.id);
              navigate("/");
            }
          }}
          className="mt-4 py-2 px-4 text-red-500 rounded-full"
        >
          <div className="flex items-center justify-center gap-1">
            <Trash />
            <p>Delete</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ContactDetails;

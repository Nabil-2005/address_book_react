import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addContact,
  getContactById,
  updateContact,
} from "../lib/contactService";
import { getInitials } from "../utils";
import { Plus, Save, X } from "lucide-react";

function AddContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    if (isEdit) {
      getContactById(id).then((data) => {
        if (data) {
          setForm(data);
        } else {
          alert("Contact not found");
          navigate("/");
        }
      });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateContact(
        id,
        form.name,
        form.phone,
        form.email,
        form.address,
        form.avatar
      );
      navigate(`/contact/${id}`);
    } else {
      await addContact(form);
      navigate("/");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 rounded-lg shadow">
      <h1 className="flex justify-center text-2xl font-bold mb-4">
        {isEdit ? "Edit Contact" : "Add Contact"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.avatar ? (
          <img
            src={form.avatar}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover border mx-auto"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border mx-auto">
            <span className="text-4xl font-bold text-gray-800">
              {getInitials(form.name)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <label
            htmlFor="avatarUpload"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Upload Avatar
          </label>
          {form.avatar && (
            <label
              htmlFor="removeAvatar"
              className="text-red-500 cursor-pointer hover:underline"
            >
              Remove Avatar
            </label>
          )}
        </div>
        <input
          id="avatarUpload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setForm((prevForm) => ({
                  ...prevForm,
                  avatar: reader.result,
                }));
              };
              reader.readAsDataURL(file);
            }
          }}
          className="hidden"
        />
        <button
          id="removeAvatar"
          type="button"
          onClick={() => {
            setForm((prevForm) => ({
              ...prevForm,
              avatar: "",
            }));
          }}
          className="hidden"
        >
          Remove Avatar
        </button>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex justify-center gap-4 mt-4">
          <button type="submit" className=" text-white px-4 py-2 rounded-full">
            {isEdit ? (
              <div className="flex items-center justify-center gap-1">
                <Save />
                <p>Update Contact</p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <Plus />
                <p>Add Contact</p>
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={
              isEdit ? () => navigate(`/contact/${id}`) : () => navigate("/")
            }
            className="px-4 py-2 rounded-full text-red-500"
          >
            <div className="flex items-center justify-center gap-1">
              <X /> <p>Cancel</p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;

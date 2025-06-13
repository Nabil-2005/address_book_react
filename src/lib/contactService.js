import dbPromise from "./db";

export async function addContact(contact) {
  const db = await dbPromise;
  const stmt = db.prepare(`
        INSERT INTO contacts (name, phone, email, address, avatar)
        VALUES (?, ?, ?, ?, ?)
    `);
  stmt.run([
    contact.name,
    contact.phone,
    contact.email,
    contact.address,
    contact.avatar,
  ]);

  stmt.free();
}

export async function getContacts() {
  const db = await dbPromise;
  const stmt = db.prepare("SELECT * FROM contacts");
  const contacts = [];

  while (stmt.step()) {
    const row = stmt.getAsObject();
    contacts.push(row);
  }

  stmt.free();
  return contacts;
}

export async function getContactById(id) {
  const db = await dbPromise;
  const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
  stmt.bind([id]);

  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();

    return row;
  } else {
    stmt.free();
    return null;
  }
}

export async function updateContact(id, ...updatedData) {
  const db = await dbPromise;
  const stmt = db.prepare(`
        UPDATE contacts
        SET name = ?, phone = ?, email = ?, address = ?, avatar = ?
        WHERE id = ?
    `);
  stmt.run([...updatedData, id]);

  stmt.free();
}

export async function deleteContact(id) {
  const db = await dbPromise;
  const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
  stmt.run([id]);

  stmt.free();
}

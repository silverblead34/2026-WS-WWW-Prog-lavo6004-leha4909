import { connection } from "../services/db.js";

export function list() {
    const stmt = connection().prepare(
        "SELECT id, title, topic, text, date FROM notes",
    );
    return stmt.all();
}

export function get(id) {
    const db = connection();
    const stmt = db.prepare(
        "SELECT id, title, topic, text, date FROM notes WHERE id = ?",
    );
    return stmt.get(id);
}

export function create(data) {
    const db = connection();
    const stmt = db.prepare(
        "INSERT INTO notes (title, text, date, topic) VALUES (?, ?, ?, ?)",
    );
    const result = stmt.run(data.title, data.text, data.date, data.topic);
    return result.lastInsertRowid;
}

export function update(id, data) {
    const db = connection();
    const stmt = db.prepare(
        "UPDATE notes SET title = ?, text = ?, date = ?, topic = ? WHERE id = ?",
    );
    stmt.run(data.title, data.text, data.date, data.topic, id);
}
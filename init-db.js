import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("data/notes.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    topic TEXT NOT NULL
  )
`);

db.exec(`
  INSERT INTO notes (title, text, date, topic) VALUES
  ('Erste Notiz', 'Das ist die erste Notiz.', '2025-11-12', 'Alltag'),
  ('Zweite Notiz', 'Noch eine Idee für später.', '2025-11-11', 'Idee'),
  ('Dritte Notiz', 'Ein Gedanke zum Projekt.', '2025-11-10', 'Arbeit'),
  ('Vierte Notiz', 'Erinnerung an den Termin.', '2025-11-09', 'Kalender'),
  ('Fünfte Notiz', 'Notiz mit Sonderzeichen: äöüß!', '2025-11-08', 'Test')
`);

db.close();
console.log("Datenbank erfolgreich erstellt und mit Beispieldaten gefüllt.");
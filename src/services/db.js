import { DatabaseSync } from "node:sqlite";

let _db = null;

export function initConnection(path) {
    if (!_db) {
        _db = new DatabaseSync(path);
    }
}

export function connection() {
    if (!_db) throw new Error("Datenbank nicht initialisiert");
    return _db;
}
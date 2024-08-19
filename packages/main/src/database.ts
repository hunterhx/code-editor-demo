import BetterSqlite3 from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

/*
 * Conversions:
 * SQLite3  JavaScript
 * NULL     null
 * REAL     number
 * INTEGER  number or BigInt
 * TEXT	    string
 * BLOB	    Buffer
 */

const dbPath = path.join(app.getAppPath(), './packages/database/mvp.sqlite');

const dbCreationOptions = {
  readonly: false,
  fileMustExist: false,
  timeout: 5000,
  // verbose: console.log,
};

export const openConnection = () => {
  const db = new BetterSqlite3(dbPath, dbCreationOptions);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
};

/*
 * Tables
 */
export const createAllTables = (db: BetterSqlite3.Database) => {
  createTableCardTypes(db);
  createTableCards(db);
  createTableLinks(db);
  createTableNoteTypes(db);
  createTableNotes(db);
  createTableReviews(db);
  createTableTags(db);
  createTableTrashItems(db);
};

export const createTableCardTypes = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS card_types (
    card_type_id INTEGER PRIMARY KEY AUTOINCREMENT
  )`;
  return db.prepare(statement).run();
};

export const createTableCards = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS cards (
    card_id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_type_id INTEGER,
    reviews BLOB,
    note_id INTEGER,
    FOREIGN KEY (card_type_id) REFERENCES card_types (card_type_id),
    FOREIGN KEY (note_id) REFERENCES notes (note_id)
  )`;
  return db.prepare(statement).run();
};

export const createTableLinks = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS links (
    link_id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_note_id INTEGER,
    target_note_id INTEGER,
    FOREIGN KEY (source_note_id) REFERENCES notes (note_id)
    FOREIGN KEY (target_note_id) REFERENCES notes (note_id)

  )`;
  return db.prepare(statement).run();
};

export const createTableNoteTypes = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS note_types (
    note_type_id INTEGER PRIMARY KEY AUTOINCREMENT
  )`;
  return db.prepare(statement).run();
};

export const createTableNotes = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS notes (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    creation_time INTEGER,
    update_time INTEGER,
    note_type_id INTEGER,
    content BLOB,
    tags BLOB,
    links BLOB,
    cards BLOB,
    path TEXT,
    FOREIGN KEY (note_type_id) REFERENCES note_types (note_type_id)
  )`;
  return db.prepare(statement).run();
};

export const createTableReviews = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER,
    FOREIGN KEY (card_id) REFERENCES cards (card_id)
  )`;
  return db.prepare(statement).run();
};

export const createTableTags = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS tags (
    tag_id INTEGER PRIMARY KEY AUTOINCREMENT
  )`;
  return db.prepare(statement).run();
};

export const createTableTrashItems = (db: BetterSqlite3.Database) => {
  const statement = `CREATE TABLE IF NOT EXISTS trash_items (
    trash_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content BLOB
  )`;
  return db.prepare(statement).run();
};

/*
 * Queries
 */
export const insertCard = (db: BetterSqlite3.Database) => {
  const statement = `INSERT INTO cards (card_type_id, note_id) VALUES (@cardTypeId, @noteId)`;
  const values = {
    cardTypeId: 1,
    noteId: 1,
  };
  return db.prepare(statement).run(values);
};

export const selectAllCards = (db: BetterSqlite3.Database) => {
  const statement = `SELECT * FROM cards`;
  return db.prepare(statement).all();
};

export * as database from './database';

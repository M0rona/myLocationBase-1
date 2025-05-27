import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync('locations.sqlite');
  // Cria a tabela se não existir
  await db.runAsync(
    'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, timestamp INTEGER);'
  );
};

export const saveLocation = async (latitude, longitude) => {
  if (!db) db = await SQLite.openDatabaseAsync('locations.sqlite');
  await db.runAsync(
    'INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?);',
    [latitude, longitude, Date.now()]
  );
};

export const getLocations = async () => {
  if (!db) db = await SQLite.openDatabaseAsync('locations.sqlite');
  const rows = await db.getAllAsync('SELECT * FROM locations ORDER BY timestamp DESC;');
  return rows;
}; 
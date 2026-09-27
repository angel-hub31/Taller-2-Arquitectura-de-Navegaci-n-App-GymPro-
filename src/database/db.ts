import { type SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('gympro.db');

export const initDatabase = async (database: SQLiteDatabase) => {
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS routines (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                muscleGroup TEXT NOT NULL,
                duration REAL NOT NULL,
                createdAt TEXT NOT NULL,
                featured INTEGER NOT NULL
            );
        `);
        console.log("Base de datos local lista y tabla 'routines' verificada.");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
}; 
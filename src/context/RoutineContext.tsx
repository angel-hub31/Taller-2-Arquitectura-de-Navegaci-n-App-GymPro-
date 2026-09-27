import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { db, initDatabase } from '../database/db';


export type Routine = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
    featured: boolean;
}
 interface RoutineContextData{
    
    routines: Routine[];
    addRoutine: (routine: Omit<Routine, 'id' | 'createdAt' | 'featured'>) => Promise<void>;
    updateRoutine: (id: string, routine: Partial<Routine>) => Promise<void>;
    deleteRoutine: (id: string) => Promise<void>;
    toggleFeatured: (id: string) => Promise<void>;
 }

 const RoutineContext = createContext<RoutineContextData | undefined>(undefined);


export const RoutineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [routines, setRoutines] = useState<Routine[]>([]);

    useEffect(() => {
        setupDatabase();
    }, []);

    const setupDatabase = async () => {
        await loadRoutines();
    };



    const loadRoutines = async () => {
        try {
            const allRows = await db.getAllAsync('SELECT * FROM routines;') as any[];
            const loaded: Routine[] = allRows.map(row => ({
                id: row.id,
                name: row.name,
                muscleGroup: row.muscleGroup,
                duration: row.duration,
                createdAt: row.createdAt,
                featured: row.featured === 1,
            }));
            setRoutines(loaded);
        } catch (error) {
            console.error('Error al cargar rutinas desde SQLite:', error);
        }
    };


    const addRoutine = async (newRoutineData: Omit<Routine, 'id' | 'createdAt' | 'featured'>) => {
        try {
            const id = Date.now().toString();
            const createdAt = new Date().toLocaleDateString();
            // Si es la primera rutina, la marcamos como destacada por defecto
            const featured = routines.length === 0 ? 1 : 0;

            await db.runAsync(
                'INSERT INTO routines (id, name, muscleGroup, duration, createdAt, featured) VALUES (?, ?, ?, ?, ?, ?);',
                [id, newRoutineData.name, newRoutineData.muscleGroup, newRoutineData.duration, createdAt, featured]
            );
            await loadRoutines();
        } catch (error) {
            console.error('Error al agregar rutina a SQLite:', error);
        }
    };

const updateRoutine = async (id: string, updatedFields: Partial<Routine>) => {
        try {
            const current = routines.find(r => r.id === id);
            if (!current) return;

            const name = updatedFields.name ?? current.name;
            const muscleGroup = updatedFields.muscleGroup ?? current.muscleGroup;
            const duration = updatedFields.duration ?? current.duration;

            await db.runAsync(
                'UPDATE routines SET name = ?, muscleGroup = ?, duration = ? WHERE id = ?;',
                [name, muscleGroup, duration, id]
            );
            await loadRoutines();
        } catch (error) {
            console.error('Error al actualizar rutina en SQLite:', error);
        }
    };

    const deleteRoutine = async (id: string) => {
        try {
            await db.runAsync('DELETE FROM routines WHERE id = ?;', [id]);
            await loadRoutines();
        } catch (error) {
            console.error('Error al eliminar rutina de SQLite:', error);
        }
    };

    const toggleFeatured = async (id: string) => {
        try {
            await db.runAsync('UPDATE routines SET featured = 0;');
            await db.runAsync('UPDATE routines SET featured = 1 WHERE id = ?;', [id]);
            await loadRoutines();
        } catch (error) {
            console.error('Error al cambiar la rutina destacada en SQLite:', error);
        }
    };

return (
        <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine, toggleFeatured }}>
            {children}
        </RoutineContext.Provider>
    );
};

export function useRoutines() {
    const context = useContext(RoutineContext);
    if (!context) throw new Error('useRoutines debe ser usado dentro de un RoutineProvider');
    return context;
}
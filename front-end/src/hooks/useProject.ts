import { useState, useEffect, useCallback } from 'react';

export type Project = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  tags: string[];
  dueDate: string | null;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'myProjects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = useCallback((data: Omit<Project,'id'|'createdAt'|'updatedAt'>) => {
    const now = new Date().toISOString();
    setProjects(ps => [
      ...ps,
      { 
        ...data, 
        id: crypto.randomUUID(),
        createdAt: now, 
        updatedAt: now 
      }
    ]);
  }, []);

  const updateProject = useCallback((id: string, changes: Partial<Project>) => {
    setProjects(ps =>
      ps.map(p => p.id === id
        ? { ...p, ...changes, updatedAt: new Date().toISOString() }
        : p
      )
    );
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects(ps => ps.filter(p => p.id !== id));
  }, []);

  return { projects, addProject, updateProject, removeProject };
}

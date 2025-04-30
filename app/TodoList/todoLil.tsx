'use client';
import React, { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../store/supabaseClient';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

type Todo = {
  id: number;
  task: string;
  created_at: string;
};

const TodoLil = () => {
  const [txtVal, setTxtVal] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ScholarHub_Todo')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTodos(data as Todo[]);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const AddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (txtVal.trim() === '') return;

    if (editId !== null) {
      await SaveEdit();
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
      .from('ScholarHub_Todo')
      .insert([{ task: txtVal }])
        .select();

      if (error) {
        throw error;
      }

      if (data && data[0]) {
        setTodos(prev => [data[0], ...prev]);
        setTxtVal('');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setError(`Failed to add todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteTodo = async (id: number) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
      .from('ScholarHub_Todo')
      .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError(`Failed to delete todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const EditTodo = (id: number, currentTask: string) => {
    setEditId(id);
    setTxtVal(currentTask);
  };

  const SaveEdit = async () => {
    if (editId === null || txtVal.trim() === '') return;

    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
      .from('ScholarHub_Todo')
      .update({ task: txtVal })
        .eq('id', editId);

      if (error) {
        throw error;
      }

      setTodos(prev => prev.map(todo => 
        todo.id === editId ? { ...todo, task: txtVal } : todo
      ));
      setEditId(null);
      setTxtVal('');
    } catch (error) {
      console.error('Error updating todo:', error);
      setError(`Failed to update todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={AddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={txtVal}
          onChange={(e) => setTxtVal(e.target.value)}
          placeholder="Enter a task"
          className="flex-grow px-3 py-2 border border-gray-300 rounded"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : editId !== null ? 'bg-blue-600' : 'bg-green-600'} text-white rounded`}
        >
          {isLoading ? '...' : editId !== null ? 'Save' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading && todos.length === 0 ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div key={todo.id} className="flex justify-between items-center border p-2 rounded">
              <span>{todo.task}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => EditTodo(todo.id, todo.task)} 
                  className="text-blue-600 disabled:text-gray-400"
                  disabled={isLoading}
                >
                  <FaRegEdit />
                </button>
                <button 
                  onClick={() => DeleteTodo(todo.id)} 
                  className="text-red-600 disabled:text-gray-400"
                  disabled={isLoading}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoLil;
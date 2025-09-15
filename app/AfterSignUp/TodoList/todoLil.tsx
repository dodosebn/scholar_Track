"use client";
import React, { useEffect, useState, FormEvent } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { supabase } from "@/app/store/supabaseClient";

type Todo = {
  id: number;
  task: string;
  created_at: string;
  user_id: string;
  is_done: boolean;
};

const TodoLil = () => {
  const [txtVal, setTxtVal] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOperationLoading, setIsOperationLoading] = useState<number | null>(
    null
  ); // For individual operations
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  const getUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      setUserId(user?.id ?? null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to get user session."
      );
    }
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("ScholarHub_Todo")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTodos(data as Todo[]);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load todos."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const AddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (txtVal.trim() === "" || !userId) return;

    if (editId !== null) {
      await SaveEdit();
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("ScholarHub_Todo")
        .insert([
          {
            task: txtVal,
            user_id: userId,
            is_done: false,
          },
        ])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setTodos((prev) => [data[0], ...prev]);
        setTxtVal("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      setError(error instanceof Error ? error.message : "Failed to add todo");
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteTodo = async (id: number) => {
    setIsOperationLoading(id);
    try {
      const { error } = await supabase
        .from("ScholarHub_Todo")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete todo"
      );
    } finally {
      setIsOperationLoading(null);
    }
  };

  const ToggleTodoStatus = async (id: number, currentStatus: boolean) => {
    setIsOperationLoading(id);
    try {
      const { error } = await supabase
        .from("ScholarHub_Todo")
        .update({ is_done: !currentStatus })
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_done: !currentStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update todo status"
      );
    } finally {
      setIsOperationLoading(null);
    }
  };

  const EditTodo = (id: number, currentTask: string) => {
    setEditId(id);
    setTxtVal(currentTask);
  };

  const SaveEdit = async () => {
    if (editId === null || txtVal.trim() === "" || !userId) return;

    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("ScholarHub_Todo")
        .update({ task: txtVal })
        .eq("id", editId)
        .eq("user_id", userId);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, task: txtVal } : todo
        )
      );
      setEditId(null);
      setTxtVal("");
    } catch (error) {
      console.error("Error updating todo:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update todo"
      );
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
          className={`px-4 py-2 ${
            isLoading
              ? "bg-gray-400"
              : editId !== null
              ? "bg-blue-600"
              : "bg-green-600"
          } text-white rounded`}
        >
          {isLoading ? "..." : editId !== null ? "Save" : "Add"}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {isLoading && todos.length === 0 ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex justify-between items-center border p-2 rounded ${
                todo.is_done ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.is_done}
                  onChange={() => ToggleTodoStatus(todo.id, todo.is_done)}
                  disabled={isOperationLoading === todo.id}
                  className="h-4 w-4"
                />
                <span
                  className={todo.is_done ? "line-through text-gray-500" : ""}
                >
                  {todo.task}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => EditTodo(todo.id, todo.task)}
                  className="text-blue-600 disabled:text-gray-400"
                  disabled={isLoading || isOperationLoading === todo.id}
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => DeleteTodo(todo.id)}
                  className="text-red-600 disabled:text-gray-400"
                  disabled={isLoading || isOperationLoading === todo.id}
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

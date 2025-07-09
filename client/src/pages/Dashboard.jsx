import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import API from "../services/api"; 

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/dashboard/note");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to load notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle note submit
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const res = await API.post("/dashboard/note", { text: newNote });
      setNotes(res.data);
      setNewNote(""); // clear input
    } catch (err) {
      console.error("Failed to add note", err);
      alert("Failed to add note: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-cyan-400 mb-2">🚀 Dashboard</h1>
      <p className="mb-6 text-gray-300">
        Welcome, <span className="font-semibold">{user?.email}</span>
      </p>

      <form onSubmit={handleAddNote} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter your note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="px-4 py-2 rounded-md text-black w-64"
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-md font-semibold"
        >
          Add Note
        </button>
      </form>

      <div className="w-full max-w-md space-y-3">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white/10 border border-cyan-300 text-white px-4 py-3 rounded-xl"
          >
            {note.text}
          </div>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-10 bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

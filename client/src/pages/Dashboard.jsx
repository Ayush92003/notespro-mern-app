/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import ViewNoteModal from "../components/viewNoteModal";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setNotes(res.data))
      .finally(() => setLoading(false));
  }, []);

  const addNote = async () => {
    if (!title || !content) {
      toast.error("Title and content required");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/notes",
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNotes([res.data, ...notes]);
    setTitle("");
    setContent("");
    toast.success("Note added");
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes(notes.filter((n) => n._id !== id));
    toast.success("Note deleted");
  };

  return (
    <>
      <Navbar />
      <ViewNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />

      <main className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500 mt-1">Manage your personal notes</p>
          </div>

          {/* Create Note Card */}
          <div className="bg-[#fdfdfd] rounded-2xl shadow-lg p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Create a new note
            </h3>

            <input
              placeholder="Note title"
              className="w-full mb-3 px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write your note here..."
              rows="4"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              onClick={addNote}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg cursor-pointer
              hover:bg-emerald-700 transition font-medium shadow"
            >
              Add Note
            </button>
          </div>

          {/* Notes Section */}
          {loading ? (
            <p className="text-gray-500">Loading notes...</p>
          ) : notes.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-xl font-medium">No notes yet</p>
              <p className="text-sm mt-1">
                Start by creating your first note above.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="group bg-[#fdfdfd] rounded-xl p-5 shadow-md
                  hover:shadow-xl transition relative"
                >
                  <h4 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                    {note.title}
                  </h4>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {note.content}
                  </p>

                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 hidden group-hover:flex gap-2">
                    <button
                      onClick={() => setSelectedNote(note)}
                      className="text-xs px-3 py-1 rounded-md
                      bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200"
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteNote(note._id)}
                      className="text-xs px-3 py-1 rounded-md
                      bg-red-100 text-red-600 cursor-pointer hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

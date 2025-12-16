export default function ViewNoteModal({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-semibold mb-2">{note.title}</h3>

        <p className="text-gray-600 whitespace-pre-wrap mb-6">{note.content}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}

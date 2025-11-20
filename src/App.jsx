import { useState, useEffect } from 'react';
import noteService from './models/note'; // (або ./models/note якщо так лишаєш)
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [newImportant, setNewImportant] = useState(false);
  const [filter, setFilter] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const newNote = {
      content: newContent,
      important: newImportant
    };

    noteService.create(newNote).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewContent('');
      setNewImportant(false);
      setHighlightedId(returnedNote.id);
      setTimeout(() => setHighlightedId(null), 1500);
    });
  };

  const deleteNote = (id, content) => {
    if (window.confirm(`Delete "${content}"?`)) {
      noteService.remove(id).then(() => {
        setNotes(notes.filter(note => note.id !== id));
      });
    }
  };

  const notesToShow = notes.filter(note =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Notes</h2>

      <div>
        filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addNote}>
        <div>
          content: <input value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        </div>
        <div>
          important: <input type="checkbox" checked={newImportant} onChange={e => setNewImportant(e.target.checked)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h3>Notes List</h3>
      <ul>
        {notesToShow.map(note => (
          <li
            key={note.id}
            className={note.id === highlightedId ? 'highlight' : ''}
          >
            {note.content} {note.important ? "(important)" : ""}
            <button onClick={() => deleteNote(note.id, note.content)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

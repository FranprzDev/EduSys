import React, { useState } from 'react';

function CommentForm({ addComment }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      addComment({ name, comment });
      setName('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Comentario"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Agregar Comentario</button>
    </form>
  );
}

export default CommentForm;


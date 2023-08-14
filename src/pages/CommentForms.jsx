import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function CommentForm({ addComment }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      addComment({ name, comment, rating });
      setName('');
      setComment('');
      setRating(0);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={8}
      />
      <textarea
        placeholder="Comentario"
        placeholder="Comentarios"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={100}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="rating">
        <span>Valoración:</span>
        {[1, 2, 3, 4, 5].map((starCount) => (
          <FontAwesomeIcon
            key={starCount}
            icon={faStar}
            className={starCount <= rating ? 'active' : ''}
            onClick={() => handleRatingChange(starCount)}
          />
        ))}
      </div>
      <button type="submit">Agregar Comentario</button>
    </form>
  );
}

export default CommentForm;



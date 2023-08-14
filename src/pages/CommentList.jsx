import React from 'react';

function CommentList({ comments, setComments }) {
  const toggleHighlight = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].isHighlighted = !updatedComments[index].isHighlighted;
    setComments(updatedComments);
  };

  return (
    <div>
      <h2>Comentarios de Clientes</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className={comment.isHighlighted ? "highlighted" : ""}>
            <strong>{comment.name}:</strong> {comment.comment}
            <button onClick={() => toggleHighlight(index)}>
              {comment.isHighlighted ? "Quitar Destaque" : "Destacar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
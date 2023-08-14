import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function CommentList({ comments }) {
  return (
    <div>
      <h2>Comentarios de Clientes</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className={comment.isHighlighted ? 'highlighted' : ''}>
            <div className="comment-header">
              <strong>{comment.name}:</strong>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((starCount) => (
                  <FontAwesomeIcon
                    key={starCount}
                    icon={faStar}
                    className={starCount <= comment.rating ? 'active' : ''}
                  />
                ))}
              </div>
            </div>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
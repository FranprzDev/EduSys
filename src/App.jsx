import React, { useState } from 'react';
import CommentForm from './pages/CommentForms';
import CommentList from './pages/CommentList';
import './StyleApp.css';

function App() {
  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    setComments([...comments, { ...comment, isHighlighted: false }]);
  };

  return (
    <div className="App">
      <h1>Formulario de Comentarios</h1>
      <CommentForm addComment={addComment} />
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
}

export default App;

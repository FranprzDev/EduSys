// Tooltip.js
import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/globalStyle.css'


const Tooltip = ({ text, position, onClose, showTooltip, buttonRef }) => {
  if (!showTooltip) return null;
  // Utilizo los portales para poder hacer un Tooltip, es algo bastante avanzado de React,
  // pero es la mejor manera de hacerlo. Los portales permiten renderizar un componente
  // fuera de su componente padre, en este caso, el tooltip se renderiza fuera del componente
  // padre, en el body, para poder posicionarlo de manera correcta.

  // Solamente es para probarlo.
  const { top, left } = buttonRef.current.getBoundingClientRect();
  const tooltipStyle = {
    top: top + 50,
    left: left -100,
  };

  return createPortal(
      <div className={`tooltip-modal tooltip-${position}`} style={tooltipStyle}>
        ID: {text}
      </div>,
    document.body
  );
};

export default Tooltip;
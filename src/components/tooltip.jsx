// Tooltip.js
import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/globalStyle.css'

const Tooltip = ({ text, position, onClose, showTooltip, buttonRef }) => {
  if (!showTooltip) return null;

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

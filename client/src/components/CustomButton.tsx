import React from 'react';
import { useSnapshot } from 'valtio';

import state from "../store";

const CustomButton = ({title, type, customStyles, handleClick }) => {
  const stateSnapshot = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: stateSnapshot.color,
        color: "#FFF"
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-2 py-1.2 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
    >
      {title}
    </button>
  )
}

export default CustomButton;

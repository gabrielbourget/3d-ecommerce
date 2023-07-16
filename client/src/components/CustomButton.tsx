import React from 'react';
import { useSnapshot } from 'valtio';

import state from "../store";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({title, type, customStyles, handleClick }) => {
  const stateSnapshot = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: stateSnapshot.color,
        color: getContrastingColor(stateSnapshot.color)
      }
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: stateSnapshot.color,
        color: stateSnapshot.color
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-25 py-2 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
    >
      {title}
    </button>
  )
}

export default CustomButton;

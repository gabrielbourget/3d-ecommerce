import React from 'react'
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
  const snapshot = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snapshot.color}
        disableAlpha
        onChange={(color) => state.color = color.hex}
        presetColors={["#9611d8"]}
      />
    </div>
  )
}

export default ColorPicker
import React from 'react'
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
  const snapshot = useSnapshot(state);

  return (
    <div classNAme="absolute lef-full ml-3">
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
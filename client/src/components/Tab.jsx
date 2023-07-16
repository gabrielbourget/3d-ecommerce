import React from 'react';
import { useSnapshot } from "valtio";

import state from "../store"


const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snapshot = useSnapshot(state);

  const activeStyles = (isFilterTab && isActiveTab) ?
    { backgroundColor: snapshot.color, opacity: 0.4 } :
    { background: "transparent", opacity: 1 };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${(isFilterTab) ? 'rounded-full glassmorphism' : 'rounded-4' }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${(isFilterTab) ? "2-2/3 h-2/3" : "w-11/12 h-11/12"} object-contain`}
      />
    </div>
  )
}

export default Tab;

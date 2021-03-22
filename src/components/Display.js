import React from "react";

import "./css/display.css";

const Display = ({ result, color }) => {
  return (
    <div id="display" className={color}>
      {result}
    </div>
  );
};

export default Display;

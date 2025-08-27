import React from "react";

function Dropdown({ title, options,func }) {
  return (
    <div className="select">
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt.toLowerCase()}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;

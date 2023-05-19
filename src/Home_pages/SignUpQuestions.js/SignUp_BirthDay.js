import React, { useRef, useState } from "react";
export const BDAY = (props) => {
  return (
    <>
      {/* Input Birthday */}
      <p>Birth date:</p>
      <input
        type="date"
        class="form-control"
        onChange={props.handleChangeDate}
        ref={props.dateInputRef}
      />
    </>
  );
};

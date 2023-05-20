import React, { useRef, useState } from "react";
export const BDAY = (props) => {
  return (
    <>
      {/* Input Birthday */}
      <p>Birth date:</p>
      <input
        type="date"
        class="form-control  rounded-4"
        onChange={props.handleChangeDate}
        ref={props.dateInputRef}
      />
    </>
  );
};

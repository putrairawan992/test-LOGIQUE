import React from "react";

function Input({ value, placeHolder="Search something", style, type='text' }) {
  return (
    <input
      onChange={(e) => value(e)}
      placeholder={placeHolder}
      className={`rounded-[400px] text-center text-gray-800 w-3/4 py-2 ${style}`}
      type={type}
    />
  );
}

export default Input;

import { useState } from "react";

export default function useInput() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { onChange, value, setValue };
}
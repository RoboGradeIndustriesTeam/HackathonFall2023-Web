import { useState } from "react";

function useInput<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T);
  };

  return {
    value,
    onChange: handleChange
  };
};

export default useInput;

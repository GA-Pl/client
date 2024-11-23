import { useState, useEffect } from 'react';

function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {}, [isToggled]);

  return [isToggled, toggle];
}

export default useToggle;

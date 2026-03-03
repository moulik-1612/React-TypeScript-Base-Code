import React, { useState } from "react";

export function useDebounceClick(delay = 1000) {
    const [canClick, setCanClick] = useState(true);
  
    const debounce = React.useCallback(() => {
      if (!canClick) return false;
      setCanClick(false);
      setTimeout(() => setCanClick(true), delay);
      return true;
    }, [canClick, delay]);
  
    return debounce;
  }

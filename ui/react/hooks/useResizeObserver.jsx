import { useEffect, useRef, useState } from "react";

export function useResizeObserver(resizeCallback) {
  const ref = useRef(null);

  const [observer] = useState(
    new ResizeObserver((entries) => entries.forEach(resizeCallback))
  );

  useEffect(() => {
    // closure reference of ref.current for unobserving
    const element = ref.current;
    observer.observe(element);
    return () => observer.unobserve(element);
  });

  return ref;
}

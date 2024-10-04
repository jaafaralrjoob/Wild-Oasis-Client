"use client";

import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
    </div>
  );
}

export default Counter;

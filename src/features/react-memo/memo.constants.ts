/**
 * Code examples for the React Memo playground.
 * These are displayed in the code panel to show the difference
 * between memoized and non-memoized components.
 */

export const CODE_EXAMPLES = {
  withoutMemo: `function Parent() {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const IncrementChildCount = () => {
    setChildCount(c => c + 1);
  };
  return (
    <div>
      <div>parent Count: {count}</div>;
      <button onClick={() => setCount(c => c + 1)}>
        Increment Parent Count
      </button>
      <button onClick={IncrementChildCount}>
        Increment Child Count
      </button>
      <Child childCount={childCount} />
    </div>
  );
}

function Child({ childCount }) {
  return <div>Child Count: {childCount}</div>;
}`,

  withMemo: `function Parent() {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const IncrementChildCount = () => {
    setChildCount(c => c + 1);
  };
  return (
    <div>
      <div>parent Count: {count}</div>;
      <button onClick={() => setCount(c => c + 1)}>
        Increment Parent Count
      </button>
      <button onClick={IncrementChildCount}>
        Increment Child Count
      </button>
      <Child childCount={childCount} />
    </div>
  );
}

const Child = memo(function Child({ childCount }) {
  return <div>Child Count: {childCount}</div>;
});`,
};

/**
 * Highlight ranges for the memoized code example.
 * This highlights the parts where memo is applied.
 * Line numbers are 1-indexed based on the withMemo code example.
 */
export const MEMO_HIGHLIGHT = {
  startLine: 20, // Line where "const Child = memo" starts
  endLine: 24,   // Line where the memoized component ends
};

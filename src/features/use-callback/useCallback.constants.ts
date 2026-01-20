export const CODE_EXAMPLES_USE_CALLBACK = {
  withoutUseCallback: `function Parent() {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  
  // New function reference created on every render
  const IncrementChildCount = () => {
    setChildCount(c => c + 1);
  };
  
  return (
    <div>
      <div>parent Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Parent Count
      </button>
      <Child 
        childCount={childCount} 
        IncrementChildCount={IncrementChildCount}
      />
    </div>
  );
}

const Child = memo(function Child({ childCount, IncrementChildCount }) {
  return (
    <div>
      <div>Child Count: {childCount}</div>
      <button onClick={IncrementChildCount}>
        Increment Child Count
      </button>
    </div>
  );
});`,

  withUseCallback: `function Parent() {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  
  // ✅ Function reference stays the same across renders
  const IncrementChildCount = useCallback(() => {
    setChildCount(c => c + 1);
  }, []); // Empty deps = function never changes
  
  return (
    <div>
      <div>parent Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Parent Count
      </button>
      <Child 
        childCount={childCount} 
        IncrementChildCount={IncrementChildCount}
      />
    </div>
  );
}

const Child = memo(function Child({ childCount, IncrementChildCount }) {
  return (
    <div>
      <div>Child Count: {childCount}</div>
      <button onClick={IncrementChildCount}>
        Increment Child Count
      </button>
    </div>
  );
});`,
};

export const USECALLBACK_HIGHLIGHT = {
  startLine: 6, // Line where useCallback starts
  endLine: 8,   // Line where useCallback ends
};


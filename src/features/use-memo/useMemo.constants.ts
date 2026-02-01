export const CODE_EXAMPLES_USE_MEMO = {
  withoutUseMemo: `function Parent() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  
  // Expensive calculation runs on EVERY render
  // Even if filter didn't change, this recalculates
  const expensiveResult = expensiveCalculation(filter);
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filter"
      />
      <div>Result: {expensiveResult}</div>
    </div>
  );
}

function expensiveCalculation(filter) {
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result + filter.length;
}`,

  withUseMemo: `function Parent() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  
  // Calculation only runs when filter changes
  // When count changes, component re-renders but calculation is skipped
  const expensiveResult = useMemo(() => {
    return expensiveCalculation(filter);
  }, [filter]); // Only recalculate if filter changes
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filter"
      />
      <div>Result: {expensiveResult}</div>
    </div>
  );
}

function expensiveCalculation(filter) {
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result + filter.length;
}`,
};

export const USEMEMO_HIGHLIGHT = {
  startLine: 7, // Line where useMemo starts
  endLine: 9,   // Line where useMemo ends
};

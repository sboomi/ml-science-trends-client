import React from 'react';

export default function Results() {
  const dummyCategories = [
    { category: 'Cat1', likelihood: 0.89 },
    { category: 'Cat2', likelihood: 0.85 },
    { catgeory: 'Cat3', likelihood: 0.75 },
  ];

  return (
    <div>
      <p>Here are your results</p>
      <p>Nothing yet! Still have to implement the fetch API</p>
      <ol>
        {dummyCategories.map((cat, index) => {
          return (
            <li key={index}>
              {cat.category}: {cat.likelihood}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

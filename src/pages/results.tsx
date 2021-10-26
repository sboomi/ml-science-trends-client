import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import AccessDenied from '../components/auth/AccessDenied';

export default function Results() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <AccessDenied />
      </>
    );
  }

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

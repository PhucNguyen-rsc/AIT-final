import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() =>{
    fetch('/api/items')
    .then((res) => res.json())
    .then((data) => setItems(data))
  })
  return (
    <main>
      <h1>Hello</h1> 
      <p>{items}</p>
    </main>
  );
}

export default App;
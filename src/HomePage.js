import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() =>{
    async function load() {
      setIsLoading(true);

      const res = await fetch(`${process.env.REACT_APP_URL}/.netlify/functions/top-books-endpoint`);
      const json = await res.json();

      setTopBooks(json.data);
      
      setIsLoading(false);
    }

    load();
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <h2>Top books</h2>
        { isLoading && <p>Loading . . .</p>}
        {
          topBooks.map((book, i) => 
            <Link to={`book/${book.id}`} key={book + i}>
              <p>{book.title}</p>
            </Link>)
        }
      </header>
    </div>
  );
}

import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState(topBooks);
  const [filter, setFilter] = useState('');

  useEffect(() =>{
    async function load() {
      setIsLoading(true);

      const res = await fetch(`${process.env.REACT_APP_URL}/.netlify/functions/top-books`);
      const json = await res.json();

      setTopBooks(json.data);
      
      setIsLoading(false);
    }

    load();
  }, []);
  
  useEffect(() => {
    const filteredBooks = topBooks
      .filter(book => book.title.toLowerCase().includes(filter.toLowerCase()));

    setFilteredBooks(filteredBooks);
  }, [filter, topBooks]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Top books</h2>
        <label>
        Filter Books
          <input onChange={e => setFilter(e.target.value)} />
        </label>
        { isLoading && <p>Loading . . .</p>}
        {
          filteredBooks.map((book, i) => 
            <Link to={`book/${book.id}/${book.title}`} key={book + i}>
              <p className='title'>{book.title}</p>
            </Link>)
        }
      </header>
    </div>
  );
}

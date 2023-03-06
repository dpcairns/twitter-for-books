import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
export default function HomePage() {
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState(topBooks);
  const [filter, setFilter] = useState('');


  useEffect(() =>{
    async function load() {
      setIsLoading(true);

      const res = await fetch(`/.netlify/functions/top-books`);
      const json = await res.json();

      setTopBooks(json.data);
      
      setIsLoading(false);
    }

    load();
  }, []);
  
  useEffect(() => {
    const brokenBooks = ['Little Women; Or, Meg, Jo, Beth, and Amy by Louisa May Alcott', 'The Complete Works of William Shakespeare by William Shakespeare'].map(it => `${it.toLowerCase()} `); // add a weird space at the end of the title to account from apparent error in my regex in top-books function.

    const filteredBooks = topBooks
      .filter(book => 
        !brokenBooks.includes(book.title.toLowerCase()) &&
        book.title.toLowerCase().includes(filter.toLowerCase())
      );

    setFilteredBooks(filteredBooks);
  }, [filter, topBooks]);

  return (
    <div className="home-page">
      <section className="list">
        <div className='description'>
          <h1>Gutenscroll</h1>
          <h2>
            <div>A doom-scrollable compendium of </div>
            <div>
              <a href="https://www.gutenberg.org/browse/scores/top">Project Gutenberg&apos;s</a> most popular books
            </div>
          </h2>
        </div>

        <label>
          Filter Books
          <input onChange={e => setFilter(e.target.value)} />
        </label>

        { isLoading && <div className='home-spinner-container'>
          <Spinner />
        </div>}

        {
          filteredBooks.map((book, i) => 
            <Link to={`book/${book.id}/${book.title}`} key={book + i}>
              <p className='list-title'>{book.title}</p>
            </Link>)
        }
      </section>
    </div>
  );
}

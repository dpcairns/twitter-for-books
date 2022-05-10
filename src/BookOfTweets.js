import { useEffect, useState } from 'react';
import './App.css';
import { makeArray } from './tweet-utils';
import { sleep } from './utils';
import Tweet from './Tweet';
import { useParams, Link } from 'react-router-dom';

export default function BookOfTweets() {
  const { id, title } = useParams();
  const [book, setBook] = useState('');
  const [howManyTweets, setHowManyTweets] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() =>{
    async function load() {
      setIsLoading(true);

      const res = await fetch(`${process.env.REACT_APP_URL}/.netlify/functions/book-endpoint?id=${id}`);
      const json = await res.json();

      setBook(json.data);
      
      setIsLoading(false);
    }

    load();
  }, [id]);
  
  async function handleShowMoreClick() {
    setIsLoading(true);
    await sleep(500);
    setHowManyTweets(howManyTweets + 2);
    setIsLoading(false);
  }

  const tweets = makeArray(book);
  return (
    <div className="App">
      <nav>
        <h4>{title.replace(/(\n)/g, '')}</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <header className="App-header">
        {
          tweets.slice(0, howManyTweets).map((tweet, i) => <Tweet 
            key={tweet + i} 
            tweet={tweet} 
            tweets={tweets} 
            i={i}
          />)
        }
        {isLoading && <p>Loading . . .</p>}
        {Boolean(book.length) && 
          <p className='show-more-tweets' onClick={handleShowMoreClick}>
            Show more Tweets
          </p>}

      </header>
    </div>
  );
}

import { useEffect, useState } from 'react';
import './App.css';
import { makeArray } from './tweet-utils';
import { sleep } from './utils';
import Tweet from './Tweet';
import { useParams, Link } from 'react-router-dom';

export default function BookOfTweets() {
  const { id, title } = useParams();
  const [book, setBook] = useState('');
  const [showTitle, setShowTitle] = useState(true);
  const [howManyTweets, setHowManyTweets] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() =>{
    async function load() {
      setIsLoading(true);

      const res = await fetch(`${process.env.REACT_APP_URL}/.netlify/functions/book?id=${id}`);
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
      {
        showTitle &&
        <nav onClick={() => setShowTitle(false)}>
          <div>
            <h4>{title.replace(/(\n)/g, '')}</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <div className='x'>
        X
          </div>
        </nav>     

      }
      <header className="App-header">
        {
          tweets.slice(0, howManyTweets).map((tweet, i) => <Tweet 
            key={tweet + i} 
            tweet={tweet} 
            tweets={tweets} 
            title={title}
            i={i}
          />)
        }
        {isLoading && <p className='show-more-tweets'>Loading . . .</p>}
        {Boolean(book.length) && 
          <p className='show-more-tweets' onClick={handleShowMoreClick}>
            show more tweets
          </p>}

      </header>
    </div>
  );
}

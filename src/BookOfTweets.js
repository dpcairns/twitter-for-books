import { useEffect, useState } from 'react';
import './App.css';
import { makeArray } from './tweet-utils';
import { sleep } from './utils';
import Tweet from './Tweet';
import { useParams } from 'react-router-dom';

export default function BookOfTweets() {
  const { id } = useParams();
  const [book, setBook] = useState('');
  const [howManyTweets, setHowManyTweets] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() =>{
    async function load() {
      setIsLoading(true);

      const res = await fetch(`http://localhost:8888/.netlify/functions/book-endpoint?id=${id}`);
      const json = await res.json();

      setBook(json.data);
      
      setIsLoading(false);
    }

    load();
  }, []);
  
  async function handleShowMoreClick() {
    setIsLoading(true);
    await sleep(500);
    setHowManyTweets(howManyTweets + 2);
    setIsLoading(false);
  }

  const tweets = makeArray(book);
  return (
    <div className="App">
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

import './App.css';
import { makeArray } from './tweet-utils';
import Tweet from './Tweet';
import FloatyLinks from './FloatyLinks';
import Spinner from './Spinner';
import { useBookOfTweets } from './useBookOfTweets';

export default function BookOfTweets() {  
  const { 
    title,
    book,
    showTitle, setShowTitle,
    howManyTweets,
    isLoading,
    handleShowMore
  } = useBookOfTweets();

  const tweets = makeArray(book);

  return (
    <>
      <FloatyLinks title={title} showTitle={showTitle} setShowTitle={setShowTitle} />

      <div className="App">
        <main>
          {
            tweets.slice(0, howManyTweets).map((tweet, i) => <Tweet 
              key={tweet + i} 
              tweet={tweet} 
              tweets={tweets} 
              title={title}
              i={i}
            />)
          }
          
          {isLoading && <Spinner />}

          {
            Boolean(book.length) && 
            <p className='show-more-tweets' onClick={handleShowMore}>
              show more tweets
            </p>
          }

        </main>
      </div>
    </>
  );
}

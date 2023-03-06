import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sleep } from './utils';

export function useBookOfTweets() {
  const { id, title } = useParams();
  const [book, setBook] = useState('');
  const [showTitle, setShowTitle] = useState(true);
  const [howManyTweets, setHowManyTweets] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
    
  async function handleShowMore() {
    setIsLoading(true);
    await sleep(500);
    setHowManyTweets(howManyTweets + 2);
    setIsLoading(false);
  }

  async function handleSpaceOrEnter({ code }) {
    if (code === 'Space' || code === 'Enter') handleShowMore();
  }
  

  useEffect(() =>{
    async function load() {
      setIsLoading(true);
  
      const res = await fetch(`/.netlify/functions/book?id=${id}`);
      const json = await res.json();
  
      setBook(json.data);
      setIsLoading(false);
    }
  
    load();
  
  }, [id]);

  useEffect(() => {
    window.addEventListener('keydown', handleSpaceOrEnter);

    return () => window.removeEventListener('keydown', handleSpaceOrEnter);
  });

  return {
    id, title,
    book, setBook,
    showTitle, setShowTitle,
    howManyTweets, setHowManyTweets,
    isLoading, setIsLoading,
    handleShowMore
  };
}
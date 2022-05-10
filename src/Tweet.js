import React from 'react';

export default function Tweet({ tweet, i, tweets }) {
  return <>
    <p className='tweet' key={tweet}>
      {i > 0 && '. . . '}
      {tweet}
      {i === 0 ? '🧵' : ` (${i + 1}/${tweets.length})`}
    </p>
    <hr />
  </>;
}

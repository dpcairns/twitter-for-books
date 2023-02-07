import React from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';

const config = genConfig(); 

export default function Tweet({ 
  tweet, 
  i, 
  tweets: { length }, 
  title,
}) {
  const splitOnBy = title.split(' by ');
  const author = splitOnBy[splitOnBy.length - 1];
  const bookName = splitOnBy.slice(0, splitOnBy.length - 1);
  return <section className='tweet'>
    <div className='left'>
      <Avatar className='avatar' {...config} />
    </div>
    <div className='right'>
      <p className='author'>
        <span className='name'>{bookName}</span> 
        <span className='handle'>{`@${author.toLowerCase().replaceAll(' ', '')}`}</span></p>
      <p className='message' key={tweet}>
        {tweet}
        {i === 0 ? '🧵' : ` ${i + 1}/${length}`}
      </p>
    </div>
  </section>;
}

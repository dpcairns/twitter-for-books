import React from 'react';
import { Link } from 'react-router-dom';

export default function FloatyLinks({ showTitle, setShowTitle, title }) {
  return (
    <>
      {
        showTitle &&
      <nav className="sticky footer" onClick={() => setShowTitle(false)}>
        <div>
          <h4>{title.replace(/(\n)/g, '')}</h4>
        </div>
        <div className='x'>
            X
        </div>
      </nav>     
      }
        

      <Link to="/">
        <section className="sticky link-home">
            Home
        </section>
      </Link>
    </>
  );
}

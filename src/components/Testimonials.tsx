import React from 'react';
import { v4 } from 'uuid';

interface TestimonialsProps {
  testimonials: {
    quote: string;
    author: string;
  }[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }): JSX.Element => (
  <div>
    {testimonials.map(({ quote, author }): JSX.Element => (
      <article key={v4()} className="message">
        <div className="message-body">
          {quote}
          <br />
          <cite>
            {' '}
            –
            {' '}
            {author}
          </cite>
        </div>
      </article>
    ))}
  </div>
);

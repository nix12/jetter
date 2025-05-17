import React from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
const DefaultJets = () => {
  return (
    <div>
      <Link href="/" as="/j/all">
        <Button>all</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/news">
        <Button>news</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/world">
        <Button>world</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/technology">
        <Button>technology</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/videos">
        <Button>videos</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/gifs">
        <Button>gifs</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/gaming">
        <Button>gaming</Button>
      </Link>
      |
      <Link href="/j/[jetId]" as="/j/pics">
        <Button>pics</Button>
      </Link>
    </div>
  );
};

export default DefaultJets;

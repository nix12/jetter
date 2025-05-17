import React, { forwardRef } from 'react';
import Link from 'next/link';

import MenuItem from '@mui/material/MenuItem';

const navigationItem = forwardRef((props, ref) => {
  const { children, link, click, linkAs } = props;

  return (
    <MenuItem ref={ref} onClick={click}>
      <Link href={link} as={linkAs}>
        <a>{children}</a>
      </Link>
    </MenuItem>
  );
});

export default navigationItem;

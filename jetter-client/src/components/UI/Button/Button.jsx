/* eslint-disable react/button-has-type */
import React from 'react';

import Button from '@mui/material/Button/Button';

const button = props => {
  const { children, clicked, disabled, type } = props;

  return (
    <Button
      onClick={clicked}
      disabled={disabled}
      variant="contained"
      color="inherit"
      type={type}
    >
      {children}
    </Button>
  );
};

export default button;

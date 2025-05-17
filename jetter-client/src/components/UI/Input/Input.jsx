import React from 'react';

import Input from '@material-ui/core/Input/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const input = props => {
  const { elementConfig, elementType, value, name, changed } = props;
  let inputElement = null;

  switch (elementType) {
    case 'input':
      inputElement = (
        <Input
          {...elementConfig}
          value={value}
          onChange={changed}
          name={name}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <TextareaAutosize {...elementConfig} value={value} onChange={changed} />
      );
      break;
    default:
      inputElement = (
        <Input
          {...elementConfig}
          value={value}
          onChange={changed}
          name={name}
        />
      );
  }

  return <div>{inputElement}</div>;
};

export default input;

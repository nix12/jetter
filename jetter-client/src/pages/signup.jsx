import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import { Alert } from '@material-ui/lab';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import {
  updateObject,
  checkValidity,
  checkPasswordMatch
} from '../shared/utility';
import { register } from '../store/actions/index';

const Signup = () => {
  const [form, setForm] = useState({
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
          maxLength: 100
        },
        valid: false,
        touched: false
      },
      password_confirmation: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password Confirmation'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
          maxLength: 100
        },
        valid: false,
        touched: false,
        match: false
      }
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(form.controls, {
      [controlName]: updateObject(form.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          form.controls[controlName].validation
        ),
        touched: true,
        match: checkPasswordMatch(
          form.controls.password.value,
          event.target.value
        )
      })
    });

    setForm({ controls: updatedControls });
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      register(
        form.controls.username.value,
        form.controls.password.value,
        form.controls.password_confirmation.value
      )
    )
      .then(response => {
        if (!response) {
          router.push('/');
        }
      })
      .catch(err => router.reload());
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

  const outputForm = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
      name={formElement.id}
    />
  ));

  const error = useSelector(state => state.register.error);
  let errorMessage = null;
  if (error) {
    errorMessage = Object.entries(error).map(([key, value], i) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      return (
        <Alert key={key} severity="error">
          {field}: {value}
        </Alert>
      );
    });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        {errorMessage}
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={submitHandler}
        >
          {outputForm}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return { props: {} };
};

export default Signup;

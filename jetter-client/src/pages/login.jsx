import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { Alert } from '@material-ui/lab';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';

import { updateObject, checkValidity } from '../shared/utility';
import { auth } from '../store/actions/index';

const Login = () => {
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
      }
    }
  });

  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(form.controls, {
      [controlName]: updateObject(form.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          form.controls[controlName].validation
        ),
        touched: true
      })
    });

    setForm({ controls: updatedControls });
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const submitHandler = event => {
    event.preventDefault();
    dispatch(
      auth(form.controls.username.value, form.controls.password.value)
    ).then(response => {
      if (response.status === 200) {
        router.push('/');
      }
    });
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

  let formOutput = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    formOutput = <CircularProgress />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        {errorMessage}
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={submitHandler}
        >
          {formOutput}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return { props: {} };
};

export default Login;

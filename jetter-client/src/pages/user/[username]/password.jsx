import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { Alert } from '@material-ui/lab';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Can from '../../../components/Permissions/Can';
import {
  checkValidity,
  updateObject,
  checkPasswordMatch
} from '../../../shared/utility';
import { update } from '../../../store/actions/index';
import redirectTo from '../../../shared/redirectTo';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);

  const [form, setForm] = useState({
    controls: {
      currentPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Current Password'
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'New Password'
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
      passwordConfirmation: {
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

  const submitHandler = event => {
    event.preventDefault();

    const cookies = new Cookies();
    const token = cookies.get('token');
    const data = jwtDecode(token);

    dispatch(
      update(
        data.user.username,
        form.controls.currentPassword.value,
        form.controls.password.value,
        form.controls.passwordConfirmation.value
      )
    ).then(() => {
      setForm(prevState => ({
        ...prevState,
        controls: {
          ...prevState.controls,
          currentPassword: {
            ...prevState.currentPassword,
            value: ''
          },
          password: {
            ...prevState.password,
            value: ''
          },
          passwordConfirmation: {
            ...prevState.passwordConfirmation,
            value: ''
          }
        }
      }));
    });
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

  let outputForm = formElementsArray.map(formElement => (
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
    outputForm = <CircularProgress />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <h1>Update Password</h1>
      <Can I="update" this="User">
        {errorMessage}
        <form onSubmit={submitHandler}>
          {outputForm}
          <Button type="submit">Submit</Button>
        </form>
      </Can>
    </div>
  );
};

UpdateUser.getInitialProps = async ({ res }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token) {
    redirectTo('/login', { res, status: 301 });
  }

  return {};
};

export default UpdateUser;

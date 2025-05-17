import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Alert } from '@material-ui/lab';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import { createJet } from '../../store/actions/index';

const NewJet = () => {
  const error = useSelector(state => state.jet.error);

  const [form, setForm] = useState({
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Description',
          rowsMin: '20',
          cols: '50'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      }
    }
  });

  const router = useRouter();
  const dispatch = useDispatch();

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

  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      createJet(form.controls.name.value, form.controls.description.value)
    )
      .then(response => {
        if (response.status === 201) {
          router.push('/j/[jetId]', `/j/${form.controls.name.value}`);
        }
      })
      .catch(err => {
        router.replace('/j/new');
      });
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

  const formOutput = formElementsArray.map(formElement => (
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

  let errorMessage = null;
  if (error) {
    errorMessage = Object.entries(error).map(([key, value]) => {
      return value.map(v => {
        const field = key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <Alert key={v} severity="error">
            {field}: {v}
          </Alert>
        );
      });
    });
  }

  return (
    <div>
      <h1>New Jet</h1>
      <div>
        {errorMessage}
        <form onSubmit={submitHandler}>
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

export default NewJet;

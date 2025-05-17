import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';

import { updateObject, checkValidity } from '../../../../shared/utility';
import { updatePost } from '../../../../store/actions/index';

import axios from '../../../../services/axios/axios-forum';

const EditPost = props => {
  const { error } = props;

  const [form, setForm] = useState({
    controls: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      uri: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Body',
          rowsMin: '20',
          cols: '80'
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

  useEffect(() => {
    const fetchPost = async () => {
      const { jetId, postId } = router.query;
      const postData = await axios.get(`/api/jets/${jetId}/links/${postId}`);

      setForm(prevState => ({
        ...prevState,
        controls: {
          ...prevState.controls,
          title: {
            ...prevState.title,
            value: postData.data.link.title
          },
          uri: {
            ...prevState.body,
            value: postData.data.link.uri
          }
        }
      }));
    };

    fetchPost();
  }, []);

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

    const { jetId, postId } = router.query;

    dispatch(
      updatePost(
        form.controls.title.value,
        form.controls.body.value,
        jetId,
        postId
      )
    ).then(response => {
      if (response.status === 204) {
        router.push('/j/[jetId]/link/[postId]', `/j/${jetId}/link/${postId}`);
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
    Object.entries(error).map(([key, value]) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      errorMessage = (
        <div>
          <span>{field}</span>
          <span>{value}</span>
        </div>
      );

      return errorMessage;
    });
  }

  return (
    <div>
      <h1>Edit Post</h1>

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

export default EditPost;

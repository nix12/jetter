import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Alert } from '@material-ui/lab';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import { createComment, updateComment } from '../../store/actions/index';

const CommentForm = props => {
  const {
    commentId,
    setUpdateComment,
    toggle,
    setToggle,
    rows,
    cols,
    value,
    edit,
    setEdit
  } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.currentUser.isLoggedIn);

  const [form, setForm] = useState({
    controls: {
      body: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          rowsMin: rows,
          cols
        },
        value: value || '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
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
        touched: true
      })
    });

    setForm({ controls: updatedControls });
  };

  const submitHandler = event => {
    event.preventDefault();

    const { jetId, postId, type } = router.query;

    let commentableType;
    if (commentId) {
      commentableType = 'Comment';
    } else {
      commentableType = 'Post';
    }

    dispatch(
      createComment(
        form.controls.body.value,
        jetId,
        postId,
        type,
        commentId || postId,
        commentableType,
        commentId || null
      )
    ).then(response => {
      if (response.status === 201) {
        setToggle(false);
        setUpdateComment(true);
        setForm(prevState => ({
          ...prevState,
          controls: {
            ...prevState.controls,
            body: {
              ...prevState.body,
              value: ''
            }
          }
        }));
      }
    });
  };

  const submitEditHandler = event => {
    event.preventDefault();

    const { jetId, postId, type } = router.query;

    let commentableType;
    if (commentId) {
      commentableType = 'Comment';
    } else {
      commentableType = 'Post';
    }

    dispatch(
      updateComment(
        form.controls.body.value,
        jetId,
        postId,
        type,
        commentId || postId,
        commentableType,
        commentId || null
      )
    ).then(response => {
      if (response.status === 204) {
        setEdit(false);
        setUpdateComment(true);
        setForm(prevState => ({
          ...prevState,
          controls: {
            ...prevState.controls,
            body: {
              ...prevState.body,
              value: ''
            }
          }
        }));
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

  let formOutput = null;
  if (isLoggedIn) {
    formOutput = formElementsArray.map(formElement => (
      <div key={formElement.id}>
        <Input
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
          name={formElement.id}
        />
        <Button type="submit">Submit</Button>
        {commentId ? (
          <Button
            type="button"
            clicked={edit ? () => setEdit(false) : () => setToggle(false)}
          >
            Cancel
          </Button>
        ) : null}
      </div>
    ));
  }

  const parentId = useSelector(state => state.comment.parentId);
  const error = useSelector(state => state.comment.error);
  let errorMessage = null;
  if (error && parentId === commentId) {
    errorMessage = Object.entries(error).map(([key, value]) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      return value.map(v => (
        <Alert key={v} severity="error">
          {field}: {v}
        </Alert>
      ));
    });
  }

  return toggle || edit ? (
    <div>
      {errorMessage}
      <form onSubmit={edit ? submitEditHandler : submitHandler}>
        {formOutput}
      </form>
    </div>
  ) : null;
};

export default CommentForm;

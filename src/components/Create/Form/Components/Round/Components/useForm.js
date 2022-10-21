import React, { useState } from 'react'
import useStyles from './styles'

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange)
      validate({ [name]: value })
  }

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }
}

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form
      className={classes.root}
      autoComplete="off"
      {...other}
    >
      {props.children}
    </form>
  )
}


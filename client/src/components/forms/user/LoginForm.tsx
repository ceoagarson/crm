import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment,  TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UserActions, UserContext } from '../../../contexts/userContext';
import { paths } from '../../../Routes';
import { Login } from '../../../services/UserServices';
import { BackendError } from '../../../types';
import { IUser } from '../../../types/user.type';
import AlertBar from '../../alert/Alert';

function LoginForm() {
  const goto = useNavigate()
  const { mutate, data, isSuccess, isLoading, isError, error } = useMutation
    <AxiosResponse<IUser>,
      BackendError,
      { username: string, password: string }
    >
    (Login)

  const { setChoice } = useContext(ChoiceContext)
  const { dispatch } = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field')
    }),
    onSubmit: (values: {
      username: string,
      password: string
    }) => {
      mutate(values)
    },
  });
  // passworrd validation
  const [visiblity, setVisiblity] = useState(false);
  const handlePasswordVisibility = () => {
    setVisiblity(!visiblity);
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
  };
  useEffect(() => {
    if (isSuccess) {
     setTimeout(()=>{
      dispatch({ type: UserActions.login, payload: data.data })
      setChoice({ type: ChoiceActions.close })
      goto(paths.dashboard)
     },1000)
    }
  }, [dispatch, goto, setChoice, isSuccess, data])
  return (
    <>

      <form onSubmit={formik.handleSubmit}>
        <AlertBar  open={isError} message={error?.response.data.message} />
        <AlertBar color="success" open={isSuccess} message="logged in successfully" />
        <Stack
          direction="column"
          pt={2}
          gap={2}
        >
          <TextField
            autoFocus
            variant="standard"
            fullWidth
            required
            error={
              formik.touched.username && formik.errors.username ? true : false
            }
            id="username"
            label="Username or Email"
            helperText={
              formik.touched.username && formik.errors.username ? formik.errors.username : ""
            }
            {...formik.getFieldProps('username')}
          />
          <TextField
            required
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            id="password"
            variant="standard"
            label="Password"
            fullWidth
            helperText={
              formik.touched.password && formik.errors.password ? formik.errors.password : ""
            }
            type={visiblity ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibility}
                    onMouseDown={(e) => handleMouseDown(e)}
                  >
                    {visiblity ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('password')}
          />
          <Button variant="contained"
            disabled={Boolean(isLoading)}
            color="primary" type="submit" fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Login"}</Button>
        </Stack>
      </form>
    </>
  )
}

export default LoginForm

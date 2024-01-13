import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import Form from './Form';
import InputAccount from './InputAccount';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import FetchingApi from './FetchingApi';
import Loading from '../Loading.jsx';
import Error from '../Error.jsx';
import { useDispatch } from 'react-redux';
import { userLogging } from '../../store/slices/userSlice.js';
import urlFetching from '../../url/url.js';

const signUpSchema =  Yup.object().shape({
  nameUser: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  emailUser: Yup.string().email('Invalid email').required('Required'),
  passwordUser: Yup.string().required('Required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least 1 number')
})

const SignUp = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [eyeStatus, setEyeStatus] = useState('faEye');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const refPassword = useRef();

  const formik = useFormik({
    initialValues: {
      nameUser: '',
      emailUser: '',
      passwordUser: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values, formikHelper) => {
      FetchingApi('signUp', urlFetching('users'), 'POST', values, formikHelper, setLoading, setError);
    },
  }); 
  
  function handleEyePassword() {
    if (!refPassword.current !== true) {
      refPassword.current.type = refPassword.current.type == 'password' ? 'text' : 'password';
      refPassword.current.type == 'text' ? setEyeStatus('faEyeSlash') : setEyeStatus('faEye');
    }
  }

  useEffect(() => {
    loading ? setTimeout(() => {
      navigate('/');
      dispatch(userLogging());  
    }, 1500) : null;
  }, [dispatch, loading, navigate])

  return (
    <>
      {error ? <Error error={error}/> : null}
      {loading ? <Loading /> : null}
      <Form className='sign-up-form md:max-w-[350px] gap-5 pt-5 p-2' onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-2'>
          <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' placeholder='Name' className="border-b p-1 style-glass" name='nameUser'/>
          <span className='text-red-500 font-inter font-medium'>{formik.touched.nameUser && formik.errors.nameUser ? formik.errors.nameUser : null}</span>
        </div>
  
        <div className='flex flex-col gap-2'>
          <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' placeholder='Email' className="border-b p-1 style-glass" name='emailUser'/>
          <span className='text-red-500 font-inter font-medium'>{formik.touched.emailUser && formik.errors.emailUser ? formik.errors.emailUser : null}</span>
        </div>
  
        <div className='flex flex-col gap-2'>
          <div className="pb-1 pr-5 flex items-center justify-between gap-2">
            <InputAccount refelement={refPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' placeholder='Password' className='grow p-1 style-glass' name='passwordUser'/>
            <FontAwesomeIcon onClick={handleEyePassword} icon= {eyeStatus == 'faEye' ? faEye : faEyeSlash} className="text-dark cursor-pointer" />
          </div>
          <span className='text-red-500 font-inter font-medium'>{formik.touched.passwordUser && formik.errors.passwordUser ? formik.errors.passwordUser : null}</span>
        </div>
  
        <Button type='submit' className='h-12' text='Create Account' />
  
        <p className='text-center'>Already have account?<Link className='text-blue-400 pl-2 font-inter font-medium text-lg' to='/log-in'>Log in</Link></p>
      </Form>
    </>
  );
}

export default SignUp;
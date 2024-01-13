
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from '../../form/Form';
import InputAccount from '../../form/InputAccount';
import { faArrowRightFromBracket, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import Loading from '../../Loading';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { removeUser, updateAccount, updateUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import urlFetching from '../../../url/url';

const editAccountSchema =  Yup.object().shape({
  nameUser: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  emailUser: Yup.string().email('Invalid email').required('Required'),
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least 1 number'),
  confirmPassword: Yup.string().required('Required')

})

// eslint-disable-next-line react/prop-types
const EditAccount = ({ userId, name, email, password }) => {

  const dispatch = useDispatch();
  const [eyeStatusCurrent, setEyeStatusCurrent] = useState('faEye');
  const [eyeStatusNew, setEyeStatusNew] = useState('faEye');
  const [eyeStatusConfirm, setEyeStatusConfirm] = useState('faEye');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const refCurrentPassword = useRef();
  const refNewPassword = useRef();
  const refConfirmPassword = useRef();

  const formik = useFormik({
    initialValues: {
      nameUser: name,
      emailUser: email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: editAccountSchema,
    onSubmit: (values, formikHelper) => {
      axios.get(urlFetching(`users`)).then(({ data }) => {
        const found = data.findIndex(user => user.emailUser == values.emailUser && user.id !== userId);
        if (found >= 0) formikHelper.setFieldError('emailUser', 'Exist this email. Try another one');
        else if (refCurrentPassword.current.value !== password) formikHelper.setFieldError('currentPassword', 'Wrong password');
        else if (refConfirmPassword.current.value !== refNewPassword.current.value) formikHelper.setFieldError('confirmPassword', 'Wrong confirm password. Please check first.');
        else {
          const newData = { nameUser: values.nameUser, emailUser: values.emailUser, passwordUser: values.newPassword };
          dispatch(updateAccount(newData)).then(({ payload }) => axios.put(urlFetching(`users/${userId}`), payload));
          dispatch(updateUser(newData));
          Swal.fire({
            title: "Good Jop!",
            text: "Your Data Added!",
            icon: "success"
          });
        }
      })
    },
  });  

  function handleEyePassword(passwordInput) {
    if (!passwordInput.current !== true) {
      passwordInput.current.type = passwordInput.current.type == 'password' ? 'text' : 'password';
      if (passwordInput == refCurrentPassword) refCurrentPassword.current.type == 'text' ? setEyeStatusCurrent('faEyeSlash') : setEyeStatusCurrent('faEye');
      if (passwordInput ==refNewPassword) refNewPassword.current.type == 'text' ? setEyeStatusNew('faEyeSlash') : setEyeStatusNew('faEye');
      if (passwordInput == refConfirmPassword) refConfirmPassword.current.type == 'text' ? setEyeStatusConfirm('faEyeSlash') : setEyeStatusConfirm('faEye');
      
    }
  }

  return (
    <div>
      {loading ? <Loading /> : null}
      <Form className='max-w-[620px] my-9 p-9 gap-4 rounded-md mx-auto shadow' onSubmit={formik.handleSubmit}>
        <h1 className="text-right text-[14px] text-black font-normal leading-5">Welcome! <span className="text-button2 text-[18px]">{name}</span></h1>
        <h2 className='font-inter mb-6 font-medium text-[30px] text-button2'>Edit Your Profile</h2>
        <div className='flex items-start flex-wrap justify-between gap-3'>
          <div className='flex flex-col grow gap-1'>
            <label className='font-inter font-medium' htmlFor="nameField">Name</label>
            <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' className="py-2 px-3 style-glass rounded" id='nameField' placeholder='Name' name='nameUser' value={formik.values.nameUser} />
            <span className='text-red-500 font-inter font-medium'>{formik.touched.nameUser && formik.errors.nameUser ? formik.errors.nameUser : null}</span>
          </div>

          <div className='flex flex-col grow gap-1'>
            <label className='font-inter font-medium' htmlFor="emailField">Email</label>
            <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' className="py-2 px-3 style-glass rounded" id='emailField' placeholder='Email' name='emailUser' value={formik.values.emailUser} />
            <span className='text-red-500 font-inter font-medium'>{formik.touched.emailUser && formik.errors.emailUser ? formik.errors.emailUser : null}</span>
          </div>
        </div>

        <div className="password-changes">
          <p className='text-[16px] py-2 font-normal'>Password Changes</p>
          <div className="passwords flex flex-col gap-3">
            <div className='style-glass rounded overflow-hidden flex items-center justify-between py-2 px-4'>
              <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} refelement={refCurrentPassword} className='bg-transparent grow' type='password'  placeholder='Current Passwod' name='currentPassword' />
              <FontAwesomeIcon onClick={() => handleEyePassword(refCurrentPassword)} icon= {eyeStatusCurrent == 'faEye' ? faEye : faEyeSlash} className="text-dark cursor-pointer w-[25px] h-[25px]" />
            </div>
            <span className='text-red-500 font-inter font-medium'>{formik.touched.currentPassword && formik.errors.currentPassword ? formik.errors.currentPassword : null}</span>

            <div className='style-glass rounded overflow-hidden flex items-center justify-between py-2 px-4'>
              <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} refelement={refNewPassword} className='bg-transparent grow' type='password'  placeholder='New Passwod' name='newPassword' />
              <FontAwesomeIcon onClick={() => handleEyePassword(refNewPassword)} icon= {eyeStatusNew == 'faEye' ? faEye : faEyeSlash} className="text-dark cursor-pointer w-[25px] h-[25px]" />
            </div>
            <span className='text-red-500 font-inter font-medium'>{formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : null}</span>

            <div className='style-glass rounded overflow-hidden flex items-center justify-between py-2 px-4'>
              <InputAccount onChange={formik.handleChange} onBlur={formik.handleBlur} refelement={refConfirmPassword} className='bg-transparent grow' type='password'  placeholder='Confirm New Passwod' name='confirmPassword' />
              <FontAwesomeIcon onClick={() => handleEyePassword(refConfirmPassword)} icon= {eyeStatusConfirm == 'faEye' ? faEye : faEyeSlash} className="text-dark cursor-pointer w-[25px] h-[25px]" />
            </div>
            <span className='text-red-500 font-inter font-medium'>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}</span>
          </div>
        </div>

        <div className="buttons flex items-center justify-end gap-4 mt-3">
          <button className='font-inter font-medium text-black'>Cancel</button>
          <button type='submit' className='py-[10px] px-[15px] bg-button2 font-inter font-medium text-white rounded-md'>Save Changes</button>
        </div>

            <button type='button' onClick={() => {
              setLoading(true);
              setTimeout(() => {
                dispatch(removeUser());
                navigate('/log-in');
              }, 1500);
            }} className='w-full md:w-[45%] ml-auto flex flex-row gap-3 items-center justify-center bg-button2 rounded text-white py-2 px-3'>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Logout</span>
            </button>
      </Form>
    </div>
  );
}

export default EditAccount;

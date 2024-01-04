
import axios from 'axios';
import urlFetching from '../../url/url';

// eslint-disable-next-line no-unused-vars
const FetchingApi = (status, url, method, body, formikHelper, setLoading, setError) => {

  function setLoadingTime() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    }

  (async function fetching() {
    setError('');
    await axios({url}).then(response => {
      const { data } = response;
      const found = data.find(user => user.emailUser === body.emailUser);

      if (status == 'signUp') {
        if (!found) {
          axios({url, method, data: {...body, wishlist: [], cart: []}});
          setLoadingTime();
          axios.post(urlFetching('user'), {...body, id: data.length + 1});
        } 
        
        else formikHelper.setFieldError('emailUser', 'Email is already in use!');
      }
  
      else if (status == 'logIn') {
        if (!found) formikHelper.setFieldError('emailUser', 'User is not found!');
        else if (found.passwordUser !== body.passwordUser) formikHelper.setFieldError('passwordUser', 'Wrong password. Try again or click Forgot password to reset it.');
        else {
          setLoadingTime();
          axios.post(urlFetching('user'), {nameUser: found.nameUser, emailUser: found.emailUser, passwordUser: found.passwordUser, id: found.id});
        }
      }
    }).catch(error => {
      setError(`${error.message}: Wrong happen! please try again`);
    })

  })();
}

export default FetchingApi;

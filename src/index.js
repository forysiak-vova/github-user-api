import './sass/main.scss';
import Notiflix from 'notiflix';
import { apiServer } from './js/apiServer.js';

const ApiServer = new apiServer();

const gallery = document.querySelector('.gallery');
const form = document.getElementById('search-form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  ApiServer.serchQuery = e.currentTarget.elements.searchQuery.value.split(' ').join('');

  if (ApiServer.serchQuery === '') {
    Notiflix.Notify.failure('please, enter text!!!');
    return;
  }

  ApiServer.fetchAxios()
    .then(response => {
      const user = response.data;
      localStorage.removeItem('user');
      localStorage.setItem('key', JSON.stringify(user));
    })
    .catch(error => {
      console.log('error', error);
      Notiflix.Notify.failure('Error, something went wrong');
      gallery.innerHTML = '';
    })
    .finally(form.reset());
}

const getUserLocalStorage = () => {
  gallery.innerHTML = '';
  if (localStorage.getItem('key') == null) {
    return;
  }
  const user = JSON.parse(localStorage.getItem('key'));
  gallery.innerHTML = `
  <div><img src="${user.avatar_url}" width="200"> <div>
        <h1>${user.login}</h1>
          <h2>${user.location ? user.location : 'no location'}</h2>
        `;
};
window.onload = () => {
  getUserLocalStorage();
};

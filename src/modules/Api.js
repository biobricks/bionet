import Config from '../config';
import Auth from './Auth';

async function getCurrentUser() {
  try {
    let currentUser = {};
    if (Auth.isUserAuthenticated()) {
      let userResponse = await loginCurrentUser();
      currentUser = userResponse.user;
    }
    return currentUser;
  } catch (error) {
    console.log('Api.getCurrentUser', error);
  }  
}

async function login(form) {
  try {  
    let request = new Request(`${Config.api.endpoint}/login`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      })
    });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.login', error);
  } 
}

async function signup(form) {
  try {  
    let request = new Request(`${Config.api.endpoint}/signup`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      })
    });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.signup', error);
  } 
}


async function loginCurrentUser() {
  try {  
    let request = new Request(`${Config.api.endpoint}/dashboard`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${Auth.getToken()}`
      })
    });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.loginCurrentUser', error);
  } 
}

async function logoutCurrentUser() {
  try {  
    Auth.deauthenticateUser();
    return true;
  } catch (error) {
    console.log('Api.logoutCurrentUser', error);
  } 
}

async function get(endpoint) {
  try {  
    let request = new Request(`${Config.api.endpoint}/${endpoint}`, { method: 'GET' });
    let response = await fetch(request);
    let result = response.json();
    //console.log('Api.get.result', result);
    return result;
  } catch (error) {
    console.log('Api.get', error);
  }
}

async function post(endpoint, form) {
  try {  
    let request = new Request(`${Config.api.endpoint}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      })
    });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.post', error);
  } 
}

async function postPublic(endpoint, form) {
  try {  
    let request = new Request(`${Config.api.endpoint}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      })
    });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.postPublic', error);
  } 
}

let api = { getCurrentUser, get, post, postPublic, loginCurrentUser, logoutCurrentUser, login, signup };

export default api;
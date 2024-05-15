const form = document.querySelector('#form1');
const inputlog = document.querySelector('#username');
const inputpass = document.querySelector('#password');
const btnautorsiz = document.querySelector('.btnautorsiz');

const LOGIN = "weather";
const PASSWORD = "site";

let incorrectAttempts = 0;

btnautorsiz.addEventListener('click', function(event) {
  event.preventDefault(); 

  const login = inputlog.value.trim(); 
  const password = inputpass.value.trim(); 

  if (login === LOGIN && password === PASSWORD) {
    btnautorsiz.onclick = function() {
      window.location.href = 'adminpage.html';
    }
  } else {
    incorrectAttempts++;

    if (incorrectAttempts >= 3) {
      btnautorsiz.disabled = true;
    }
  }
});

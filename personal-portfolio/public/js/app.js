const contactForm = document.querySelector('.contact-form');
let formName = document.getElementById('name');
let email = document.getElementById('email');
let submit = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  let formData= {
    name: formName.value, 
    email: email.value,
    subject: subject.value,
    message: message.value
  }
  //xmlhttprequestは古いので、fetchAPIに替える
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function() {
    console.log(xhr.responseText);
    if(xhr.responseText = 'success') {
      alert('Email sent');
      formName.value = '';
      email.value = '';
      subject.value = '';
      message.value = '';
    } else {
      alert('Something went wrong')
    }
  }

  xhr.send(JSON.stringify(formData));
  
})
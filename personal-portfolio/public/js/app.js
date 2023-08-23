const contactform = document.querySelector('.contact-form')
// catch submit btn
const btn_submit = document.getElementById("submit");

const input_name = document.querySelector(`.name`);
const input_email = document.querySelector('.email');
const input_subject = document.querySelector('.subject');
const input_message = document.querySelector('.message');

contactform.addEventListener('submit', (e) => {
  e.preventDefault();
  // initialize FormData object
  const fd = new FormData();
  
  fd.append('name', input_name.value);
  fd.append('email', input_email.value);
  fd.append('subject', input_subject.value);
  fd.append('message', input_message.value);
  console.log(fd.getAll('email'));
  // send input data on FormData object
  fetch("/", {
    method: 'POST',
    body: fd,
  }).then(async (response) =>{ 
    const result = await response.json();
    console.log('result : ', result)
  }).catch((error) => {
    console.log(error);
  });   
})





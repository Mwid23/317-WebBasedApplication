
function setFlashMessageFadedOut(flashMessageElement) {
    setTimeout(() => {
      let currentOpacity = 1.0;
      let timer = setInterval(() => {
        if(currentOpacity < 0.05) {
            clearInterval(timer);
            flashMessageElement.remove();

        }
        currentOpacity = currentOpacity - .05;
        flashMessageElement.style.opacity = currentOpacity;
      }, 50);
    },4000);
  }

  function addFlashFromFrontEnd(message){
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadedOut(flashMessageDiv);
  }

  function createCare(postData) {
      return `<div id="post-${postData.id}" class="card">
      <img class="card-image" src="${postData.thumbnail}"" alt="">
      <div class="card-body">
          <p class="card-title">${postData.title}</p>
          <p class="card-text">${postData.description}</p>
          <a href="/post/${postData.id}" class="anchor-buttons">Post Details</a>
      </div>
  </div>`;
  }


  function executeSearch() {
      let searchTerm = document.getElementById('search-text').value;
      if(!searchTerm){
          location.replace('/');
          addFlashFromFrontEnd('Empty search term, here is the last 8 posts');
          return;

      }
      let mainContent = document.getElementById('main-content');
      let searchURL = `/posts/search?search=${searchTerm}`;
      fetch(searchURL)
      .then((data) => {
          return data.json();
      })
      .then((data_json) =>{
          let newMainContentHTML = '';
          data_json.results.forEach((row) => {
              newMainContentHTML += createCard(row);
          });
          mainContent.innerHTML = newMainContentHTML;
          if(data_json.message){
            addFlashFromFrontEnd(data_json.message);
          }
      })
      .catch((err) => console.log(err));
  } 
  let flashElement = document.getElementById('flash-message');
  if(flashElement){
      setFlashMessageFadedOut(flashElement);
  }
  //when we submit the form, this function will be called.
  let searchButton = document.getElementById('search-button');
  if (searchButton){
      searchButton.onClick = executeSearch;
  }

  function myValidation(event) {
    event.preventDefault()
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("passwd").value;
    var cpasswd = document.getElementById("cpasswd").value;
    var message = document.getElementById("message");
    var error_message = "";
    console.log("You clicked on submit.");
  
    var passwordCheck = false;
    var usernameCheck = false;
  
    // check if username not begins with [a-zA-Z]
    var re_aplhanum = /^[a-z0-9]+$/;
    console.log(username)
    if (
      ("a" > username[0] || username[0] > "z") &&
      ("A" > username[0] || username[0] > "Z")
    ) {
      error_message += "Username must start with a-z or A-Z.<br>";
    }
    //check length and alphanumeric charaters of username
    else if (username.length < 3 || !re_aplhanum.test(username)) {
      error_message +=
        "Username must include 3 or more Alphanumeric Characters.<br>";
    } else {
      usernameCheck = true;
    }
  
    //check passsword validation one by one
    var re_num = /[0-9]/;
    var re_uppercase = /[A-Z]/;
    var re_specialchar = /[/*-+!@#$^&*]/;
    // check password length
    if (password.length < 8) {
      console.log("I am in length test");
      error_message += "Password must be 8 or more characters.<br>";
    }
    // check at least one number
    else if (!re_num.test(password)) {
      console.log("I am in at leat one number test");
      error_message += "Password must contain at least one number.<br>";
    }
    // check at least one Uppercase letter
    else if (!re_uppercase.test(password)) {
      error_message += "Password must contain at least one Uppercase Letter.";
    }
    // check at least one special char
    else if (!re_specialchar.test(password)) {
      error_message +=
        "Password must contain one special character.(/*-+!@#$^&*).<br>";
    }
    // check both password fields are equal or not
    else if (password !== cpasswd) {
      error_message += "Both Passwords must be same!";
    } else {
      passwordCheck = true;
    }
  
    if (passwordCheck && usernameCheck) {
      // successfull form submission
      document.getElementById("form-grid-reg").submit();
    } else {
      //show error message
      message.innerHTML = error_message;
      message.style.color = "white";
    }
  }
  /*let containerDiv = document.getElementById('container');
let countEle = document.getElementById('count');
let fetchUrl = "https://jsonplaceholder.typicode.com/albums/2/photos";

function fadeOut(event) {

let currentDiv = event.currentTarget;
let currentOpacity = 1.0;

let timer = setInterval(() => {
    console.log('i');
    if(currentOpacity < 0.5) {
    currentDiv.remove();
    clearInterval(timer);
    countEle.innerHTML= `showing ${document.querySelectorAll('[id^="photo-"]').length} photo(s).`;
    }
    currentDiv.style.opacity = currentOpacity;
    currentOpacity -= 0.5;

},10)


}
    
function createPhotoCard (photo) {
    return `
        <div id=photo-${photo.id}>
            <img src=${photo.thumbnailUrl}/>
            <h2>${photo.title}</h2>
        </div>

    `;
}

fetch(fetchUrl)
    .then((response) => {return response.json()})
    .then(photos => {
        let containerHTML = '';
        photos.forEach(photo => {
            containerHTML += createPhotoCard(photo);
        });
        countEle.innerHTML =`showing${photos.length}photo(s).`;
        containerDiv.innerHTML = containerHTML;
        let photodivs = document.querySelectorAll('[id^="photo-"]');
        photodivs.forEach(div => {
            div.addEventListener('click',fadeOut);
        })
    })   
    .catch(err => console.log(err)); */

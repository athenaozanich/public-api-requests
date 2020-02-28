const rndmApiCall = 'https://randomuser.me/api/?format=json&results=12&inc=gender,email,location,phone,dob,name,picture&nat=US';
let gallery = document.getElementById("gallery");
let cards;
let empData;

// Handle all fetch requestsusing async/await approach
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getEmployees(url) {
  const EmployeesJSON = await getJSON(url);
  const EmployeeList = EmployeesJSON.results;
  return Promise.all(EmployeeList);
}

// Generate the markup for each profile card in the gallery
const generateHTML= (data)=> {
  let employeeList = ``;
  data.map( (emp, i) => {
    employeeList += 
    `<div class="card num--${i}">
      <div class="card-img-container">
        <img class="card-img" src="${emp.picture.large}">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${emp.name.first} ${emp.name.last}</h2>
        <p class="card-text">${emp.email}</p>
        <p class="card-text cap">${emp.location.city}</p>
      </div>
    </div>`;
  });
  // add cards to dom
  gallery.innerHTML = employeeList;
  // select cards
  cards = document.querySelectorAll('.card');
  empData = data;
  // pass data to global scope for use in other functions
  return empData;
}

// Generate the markup for each profile card modal
const modal = (empData, id)=>{
  var dob = empData[id].dob.date.split("");
  var dobfrmtd = `${dob[5]}${dob[6]}/${dob[8]}${dob[9]}/${dob[2]}${dob[3]}`;
  let modalWindow = `
  <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${empData[id].picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${empData[id].name.first} ${empData[id].name.last}</h3>
                  <p class="modal-text">${empData[id].email}</p>
                  <p class="modal-text cap">${empData[id].location.city}</p>
                  <hr>
                  <p class="modal-text">${empData[id].phone}</p>
                  <p class="modal-text">${empData[id].location.street.number} ${empData[id].location.street.name}, ${empData[id].location.city}, ${empData[id].location.state} ${empData[id].location.postcode}</p>
                  <p class="modal-text">Birthday:${dobfrmtd}</p>
              </div>
          </div>

          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
      </div>`;
      //Append modal to the page
      document.querySelector('body').append(document.createRange().createContextualFragment(modalWindow));
      //Add new event listeners for the modal buttons 
      document.getElementById("modal-close-btn").addEventListener('click',(e)=>{
        document.querySelector(".modal-container").remove();
      });
      //Calculate and update current id based on which nav button is clicked
      document.querySelector(".modal-btn-container").addEventListener('click',(e)=>{
        if(e.target.id === "modal-prev"){
          id--;
          if (id < 0)id=empData.length-1;
        }
        if(e.target.id === "modal-next"){
          id++;
          if (id > 11)id=empData.length-empData.length;
        }
        // Remove previous modal and update modal with new information
        document.querySelector(".modal-container").remove();
        modal(empData,id);
     });
}

//Call functions and add listeners to each card in the gallery
getEmployees(rndmApiCall)
.then(generateHTML)
.catch( e => {
  // throw error if something goes wrong
  gallery.innerHTML = '<h3>Something went wrong!</h3>';
})
.finally( () => {
  cards.forEach((card, id) => {
    card.addEventListener('click', (e)=>{
      // On click call modal function
      modal(empData,id);
           
    });
  });
});

let gallery = document.getElementById("gallery");
let cards;
let resultArr =[];

// Handle all fetch requests using async/await approach
async function getUserInfo(name) {
  let response = await fetch(`https://api.github.com/users/${name}`);
  try {
    return await response.json();
  } catch (error) {
    throw error;
  }
}
// async function getRepos(name) {
//   let response = await fetch(`https://api.github.com/users/${name}/repos`);
//   try {
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// }
getUserInfo('athenaozanich')
	.then(data => console.table(data))
  .catch(error => console.error('An error with your request has occured. Error - ', error));
  
const reconstructData = (data)=>{
  // data.forEach(result =>{
  //   result = {
  //     repoName: result.name
  //   };
  //   resultArr.push(result);
  // });
  // return resultArr;
  console.log(data.name);
}
// // Generate the markup for each profile card in the gallery
// const generateHTML= (data)=> {
//   let search = `<form action="#" method="get">
//   <input type="search" id="search-input" class="search-input" placeholder="Search...">
//   <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
//   </form>`;
//   let employeeList = ``;
//   data.map( (emp, i) => {
//     employeeList += 
//     `<div class="card num--${i}">
//     <div class="card-img-container">
//     <img class="card-img" src="${emp.picture}">
//     </div>
//     <div class="card-info-container">
//     <h3 id="name" class="card-name cap">${emp.fullName}</h2>
//     <p class="card-text">${emp.email}</p>
//     <p class="card-text cap">${emp.city}</p>
//     </div>
//     </div>`;
//   });
//   // add search and employee cards to dom
//   document.querySelector('.search-container').innerHTML = search;
//   gallery.innerHTML = employeeList;
//   // select cards
// }

// // Generate the markup for each profile card modal
// const modal = (data, id)=>{
  
//   let modalWindow = `
//   <div class="modal-container">
//           <div class="modal">
//               <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//               <div class="modal-info-container">
//                   <img class="modal-img" src="${data[id].picture}" alt="profile picture">
//                   <h3 id="name" class="modal-name cap">${data[id].fullName}</h3>
//                   <p class="modal-text">${data[id].email}</p>
//                   <p class="modal-text cap">${data[id].city}</p>
//                   <hr>
//                   <p class="modal-text">${data[id].phone}</p>
//                   <p class="modal-text">${data[id].fullAddr}</p>
//                   <p class="modal-text">Birthday:${data[id].dobfrmtd}</p>
//               </div>
//           </div>

//           <div class="modal-btn-container">
//               <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//               <button type="button" id="modal-next" class="modal-next btn">Next</button>
//           </div>
//       </div>`;
//       updateModal(modalWindow,id);
// }

// const updateModal = (modalInfo, id) => {
//   //Append modal to the page
//   document.querySelector('body').append(document.createRange().createContextualFragment(modalInfo));
//   //Add new event listeners for the modal buttons 
//   document.getElementById("modal-close-btn").addEventListener('click',(e)=>{
//     document.querySelector(".modal-container").remove();
//   });
//   //Calculate and update current id based on which nav button is clicked
//   document.querySelector(".modal-btn-container").addEventListener('click',(e)=>{
//     let cards = document.querySelectorAll('.card');
//     if(e.target.id === "modal-prev"){

//       do {
//         if (id <= resultArr.length - resultArr.length){
//           id = resultArr.length-1;
//         }else{
//             id--;
//         }
//       }
//       while (cards[id].style.display === "none");
//     }
//     if(e.target.id === "modal-next"){
//       do {
//         if (id >= resultArr.length-1){
//           id = resultArr.length - resultArr.length;
//         }else{
//           id++;
//         }
//       }
//       while (cards[id].style.display === "none");
//     }
//     // Remove previous modal and update modal with new information
//     document.querySelector(".modal-container").remove();
//     console.log(id);
//     modal(resultArr,id);
//  });
// }
//Call functions and add listeners to each card in the gallery
getUserInfo('athenaozanich')
.then(reconstructData)
//.then(generateHTML)
.catch( e => {
  // throw error if something goes wrong
  gallery.innerHTML = '<h3>Something went wrong!</h3>';
})
.finally( () => {
  // document.querySelectorAll('.card').forEach((card, id) => {
  //   card.addEventListener('click', (e)=>{
  //     // On click call modal function
  //     modal(resultArr,id);
  //   });
  // });
  // document.querySelector('#search-submit').addEventListener('click', (e)=>{
  //   e.preventDefault();
  //   let srchVal = document.querySelector('#search-input').value;
  //   let empNames = document.querySelectorAll('#name');
  //   document.querySelectorAll('.card').forEach( (card, id) => {
  //     if (empNames[id].innerHTML.toLowerCase().indexOf(srchVal.toLowerCase()) > -1) {
  //       card.style.display = '';
  //     }else{
  //       card.style.display = 'none';
  //     }

  //   });
  // });
});

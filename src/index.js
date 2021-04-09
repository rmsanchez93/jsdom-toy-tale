let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }); //end of addBtn eventListener

  fetchAndysToys();

  addNewToy();
});

function fetchAndysToys() {
  //make a fetch and render toys to page
  fetch("http://localhost:3000/toys") //request sent to server
    .then(function (response) {
      return response.json(); //converting request to json format, return promise
    })
    .then(function (toyData) {
      // console.log('this string is in the fetch .then')
      toyData.forEach(renderToy);
    });
  // console.log('this string is outside of the fetch')
}
// const fetchAndysToys = () => {
//   //arrow function syntax
// }

const renderToy = (toy) => {
  console.log(toy);
  //   <div class="card">
  //   <h2>Woody</h2>
  //   <img src=toy_image_url class="toy-avatar" />
  //   <p>4 Likes </p>
  //   <button class="like-btn">Like <3</button>
  //   </div>
  //create all element we need
  const div = document.createElement("div");
  div.className = "card";
  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`
  const img = document.createElement("img");
  img.src = toy.image
  img.className = 'toy-avatar'
  const button = document.createElement("button");
  button.className = 'like-btn'
  button.innerText = 'Like <3'
  //when button is clicked, we want to update likes
  button.addEventListener('click', ()=>{
    console.log("I'm clicked", toy)

    p.innerText = `${++toy.likes} Likes`
    console.log(toy.likes)
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({likes: toy.likes})
    })

    //patch request to server for updated likes
    //change number of likes to increment by one

  })
  

  //appending domElement in JavaScript space
  div.append(h2, img, p, button);

  //get toyCollectionDiv
  const toyCollection = document.querySelector("#toy-collection");
  //appending to existing element on index.html
  toyCollection.append(div);
};

const addNewToy = () => {
  //grab form in index.html
  const toyForm = document.querySelector('.add-toy-form')
  // console.log(toyForm)
  //add submit listener
  toyForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    // console.log(e)
    //when submitted
    //grab user input
    let newName = e.target[0].value
    let newImage = e.target[1].value
    //format data for POST request
    let newToy = { 
      name: newName,
      image: newImage,
      likes: 0
    }

    //options object for our fetch request
    let reqPackage = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(newToy)
    }
    //fetch
    fetch('http://localhost:3000/toys', reqPackage)
    .then(res => res.json())
    .then(newToy => renderToy(newToy))
    //THEN after successful
    //render toy to index.html

  })
}

const inventoryItemTemplate = document.querySelector("[inventory-item-template]")
const inventoryItemContainer = document.querySelector("[data-item-cards-container]")
const searchInput = document.querySelector("[data-search]")
const addItem = document.querySelector("[add-item]")
const information = document.querySelector("[info]")

let items = []

information.hidden = true

searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase()
  items.forEach(item => {
    const isVisible = item.name.toLowerCase().includes(value) || item.tags.toLowerCase().includes(value)
    item.element.classList.toggle("hide", !isVisible)
  })
})

fetch('inventory.json')
  .then(res => res.json())
  .then(data => {
    items = data.map(item => {
      const card = inventoryItemTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector('[data-header]')
      const body = card.querySelector('[data-body]')
      header.textContent = item.name
      body.textContent = 'Amount: ' + item.amount
      //body4.textContent = item.location.image
      inventoryItemContainer.append(card)
      card.addEventListener('click', () => {
        showInfo(item);
        addItem.hidden = true;
        information.hidden = false;
})
      return { name: item.name, tags: item.tags, element: card }
  })
})

function showInfo(item) {
  const header = document.querySelector("[info-header]");
  const amount = document.querySelector("[info-amount]");
  const location = document.querySelector("[info-location]");
  const website = document.querySelector("#info-website");
  const description = document.querySelector("[info-description]");
  const image = document.querySelector("#info-image");
  header.textContent = item.name;
  amount.textContent = `Amount: ${item.amount}`;
  location.textContent = item.location.area;
  website.href = item.website;
  description.textContent = item.description;
  image.src = item.location.image;
  console.log(item)
}


const newItemAmount = document.querySelector('[new-item-amount]');
const newItemIncrementAmount = document.querySelector('[new-item-increment-amount]');
const newItemDecrementAmount = document.querySelector('[new-item-decrement-amount]');

newItemIncrementAmount.addEventListener('click', () => {
  const val = parseInt(newItemAmount.value) || 0;
  if (val < 99) newItemAmount.value = val + 1;
})

newItemDecrementAmount.addEventListener('click', () => {
  if (parseInt(newItemAmount.value) > 0) newItemAmount.value = parseInt(newItemAmount.value) - 1;
})

newItemAmount.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
  if (parseInt(newItemAmount.value) < 0) newItemAmount.value = 0;
  if (parseInt(newItemAmount.value) > 99) newItemAmount.value = 99;
  }
})

newItemAmount.addEventListener('blur', () => {
  const val = parseInt(newItemAmount.value);
  if (val > 99) newItemAmount.value = 99;
  if (val < 0) newItemAmount.value = 0;
})

let fileInput = document.getElementById("file-input");
let imageContainer = document.getElementById("images");
let numOfFiles = document.getElementById("num-of-files");

fileInput.addEventListener('input', () => preview())

function preview() {
  imageContainer.innerHTML = "";
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`

  for (i of fileInput.files) {
    let reader = new FileReader();
    let figure = document.createElement("figure");
    let figCap = document.createElement("figcaption");
    figCap.innerText = i.name;
    figure.appendChild(figCap);
    reader.onload = () => {
      let img = document.createElement("img");
      img.setAttribute("src", reader.result);
      img.style.height = "100px";  
      figure.insertBefore(img, figCap);
    }
    imageContainer.appendChild(figure);
    reader.readAsDataURL(i);
  }
}

const form = document.querySelector('[add-item]');

form.addEventListener('submit', (event => {
  event.preventDefault();

  const formData = new FormData(form);
  let dataArray = new Array();
  for (const entry of formData.entries()){
    dataArray.push(entry[1]);
  }
  console.log(dataArray);
}))
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
  const website = document.querySelector("[info-website]");
  const description = document.querySelector("[info-description]");
  const image = document.querySelector("[info-image]");
  header.textContent = item.name;
  amount.textContent = `Amount: ${item.amount}`;
  location.textContent = item.location.area;
  website.textContent = item.website;
  description.textContent = item.description;
  console.log(item)
}
const createRecipe = document.getElementById("create-recipe-form")

// Minimum 2 products in the ingredients list
function checkIngredientListLength() {
  const minimumLengthMessage = document.getElementById("info-min-products")
  let checkIfTwoProductsMin = [...document.getElementById("ingredients-list").querySelectorAll("li")]
  if (checkIfTwoProductsMin.length < 2) {
    btnCreate.disabled = true
    minimumLengthMessage.style.display = ""
  } else {
    btnCreate.disabled = false
    minimumLengthMessage.style.display = "none"
  }
}

function addListenersRemoveButton() {
  let btnRemove = [...document.getElementsByClassName("delete-product__button")]
  btnRemove.forEach(btn => {
    btn.addEventListener("click", function(){
      event.preventDefault()
      btn.parentNode.remove()
      checkIngredientListLength()
    })
  })
}

if (createRecipe) {
document.getElementById("new-ingredient").addEventListener("click", function(){
  event.preventDefault()
  const products = document.getElementById("products")
  let ingredient = products.options[products.selectedIndex].innerHTML
  let quantity = document.getElementById("quantity").value ? document.getElementById("quantity").value : 0
  let ingredientId = document.getElementById("products").value

  const newProduct = document.createElement('li')
  newProduct.innerHTML = `<span>${ingredient}</span>     <span>${quantity}</span> g 
                          <button
                            class="delete-product__button"
                          >
                          </button>
                          <span style="display:none">${ingredientId}</span>`
  let productAlreadyAdded = false
  let productsAddedByUser = [...document.getElementById("ingredients-list").querySelectorAll("li")]
  productsAddedByUser.forEach(elem => {
    if (elem.querySelectorAll("span")[0].innerHTML === ingredient) {
      productAlreadyAdded = true
      return
    }
  })
  if (!productAlreadyAdded) {
    document.getElementById('ingredients-list').appendChild(newProduct)
  }
  addListenersRemoveButton()
});
}

let btnCreate = document.querySelector("#create-recipe-button")
if (createRecipe) {
  document.querySelector("#new-ingredient").addEventListener("click", function(){
    checkIngredientListLength()
  })
}

if(createRecipe){
  btnCreate.addEventListener("click", function(){
    let productsToAdd = [...document.getElementById("ingredients-list").querySelectorAll("li")]
    productsToAdd.forEach(elem => {
      const newProductItem = elem.querySelectorAll("span")[2].innerHTML
      const newQuantityItem = parseFloat(elem.querySelectorAll("span")[1].innerHTML)

      const newProductInput = document.createElement('input')
      newProductInput.type = "hidden"
      newProductInput.value = newProductItem
      newProductInput.name = "productIds"

      const newQuantityInput = document.createElement('input')
      newQuantityInput.type = "hidden"
      newQuantityInput.value = newQuantityItem
      newQuantityInput.name = "quantities"

      document.getElementById('list-to-send').appendChild(newProductInput)
      document.getElementById('list-to-send').appendChild(newQuantityInput)
    })
  })
}

const searchResults = document.getElementById("search-results")
if (searchResults) {
  const searchItem = document.getElementById("search-item")
  searchItem.addEventListener("keyup", filterFunction)

  function filterFunction() {
    console.log(searchItem.value)
    let filter = searchItem.value.toUpperCase()
    let card = document.getElementsByClassName("card")
    for (let i=0; i<card.length; i++) {
      let txtValue = card[i].textContent.trim() || card[i].innerText.trim()
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
  }
}

if (createRecipe) {
  addListenersRemoveButton()
  checkIngredientListLength()
}
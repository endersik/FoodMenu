const uri = 'api/Foods';
let foods = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addCategoryTextbox = document.getElementById('add-category');
  const addPriceTextbox = document.getElementById('add-price');

  const item = {
    name: addNameTextbox.value.trim(),
    category: addCategoryTextbox.value.trim(),
    price: parseFloat(addPriceTextbox.value)
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addCategoryTextbox.value = '';
      addPriceTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = foods.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-category').value = item.category;
  document.getElementById('edit-price').value = item.price.toPrecision();
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    name: document.getElementById('edit-name').value.trim(),
    category: document.getElementById('edit-category').value.trim(),
    price: parseFloat(document.getElementById('edit-price').value)
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'food' : 'foods';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('foods');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    
    let td1 = tr.insertCell(0);
    let nameTextNode = document.createTextNode(item.name);
    td1.appendChild(nameTextNode);
    
    let td2 = tr.insertCell(1);
    let categoryTextNode = document.createTextNode(item.category);
    td2.appendChild(categoryTextNode);

    let td3 = tr.insertCell(2);
    let priceTextNode = document.createTextNode(item.price);
    td3.appendChild(priceTextNode);

    let td4 = tr.insertCell(3);
    td4.appendChild(editButton);

    let td5 = tr.insertCell(4);
    td5.appendChild(deleteButton);
  });

  foods = data;
}


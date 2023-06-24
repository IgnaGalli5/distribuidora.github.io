
document.addEventListener('DOMContentLoaded', function() {
  const productForm = document.getElementById('product-form');
  const productList = document.getElementById('product-list');
  let products = JSON.parse(localStorage.getItem('products')) || [];

  productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const productCode = document.getElementById('product-code').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productQuantity = document.getElementById('product-quantity').value;

    if (productCode && productName && productPrice && productQuantity) {
      const product = {
        code: productCode,
        name: productName,
        price: parseFloat(productPrice).toFixed(2),
        quantity: productQuantity
      };

      const index = findProductIndex(productCode);
      if (index !== -1) {
        // Si el producto ya existe, actualiza sus valores
        products[index] = product;
      } else {
        // Si el producto es nuevo, agrégalo a la lista
        products.push(product);
      }

      saveProducts();
      displayProducts();
      clearForm();
    }
  });

  // Guarda los productos en el almacenamiento local
  function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Muestra los productos en la lista
  function displayProducts() {
    productList.innerHTML = '';

    products.forEach(function(product) {
      const row = document.createElement('tr');
      row.id = product.code;

      const dateCell = document.createElement('td');
      const currentDate = new Date().toLocaleDateString();
      dateCell.textContent = currentDate;

      const codeCell = document.createElement('td');
      codeCell.textContent = product.code;

      const nameCell = document.createElement('td');
      nameCell.textContent = product.name;

      const priceCell = document.createElement('td');
      priceCell.textContent = product.price;

      const quantityCell = document.createElement('td');
      quantityCell.textContent = product.quantity;

      const actionsCell = document.createElement('td');

      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', function() {
        editProduct(product);
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', function() {
        deleteProduct(product);
      });

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      row.appendChild(dateCell);
      row.appendChild(codeCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(actionsCell);

      productList.appendChild(row);
    });
  }

  // Limpia los campos del formulario
  function clearForm() {
    document.getElementById('product-code').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '';
  }

  // Función para editar un producto existente
  function editProduct(product) {
    const row = document.getElementById(product.code);

    const codeCell = row.cells[0];
    const nameCell = row.cells[1];
    const priceCell = row.cells[2];
    const quantityCell = row.cells[3];
    const actionsCell = row.cells[4];

    const codeInput = document.createElement('input');
    codeInput.type = 'text';
    codeInput.value = product.code;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = product.name;

    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.step = '0.01';
    priceInput.value = product.price;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = product.quantity;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', function() {
      const newCode = codeInput.value;
      const newName = nameInput.value;
      const newPrice = parseFloat(priceInput.value).toFixed(2);
      const newQuantity = quantityInput.value;

      if (newCode && newName && newPrice && newQuantity) {
        const editedProduct = {
          code: newCode,
          name: newName,
          price: newPrice,
          quantity: newQuantity
        };

        const index = findProductIndex(product.code);
        if (index !== -1) {
          // Reemplaza el producto existente con el producto editado
          products[index] = editedProduct;
          saveProducts();
          displayProducts();
        }
      }
    });

    codeCell.innerHTML = '';
    nameCell.innerHTML = '';
    priceCell.innerHTML = '';
    quantityCell.innerHTML = '';
    actionsCell.innerHTML = '';

    codeCell.appendChild(codeInput);
    nameCell.appendChild(nameInput);
    priceCell.appendChild(priceInput);
    quantityCell.appendChild(quantityInput);
    actionsCell.appendChild(saveButton);
  }

  // Elimina un producto de la lista
  function deleteProduct(product) {
    products = products.filter(function(item) {
      return item.code !== product.code;
    });

    saveProducts();
    displayProducts();
  }

  // Encuentra el índice de un producto en la lista de productos
  function findProductIndex(productCode) {
    return products.findIndex(function(product) {
      return product.code === productCode;
    });
  }

  displayProducts();
});


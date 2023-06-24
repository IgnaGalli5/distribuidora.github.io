document.addEventListener('DOMContentLoaded', function() {
    const salesForm = document.getElementById('sales-form');
    const salesTable = document.getElementById('sales-table');
    const salesTableBody = salesTable.querySelector('tbody');
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    salesForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const productCode = document.getElementById('product-code').value;
      const quantitySold = parseInt(document.getElementById('quantity-sold').value);
  
      const product = products.find(function(item) {
        return item.code === productCode;
      });
  
      if (product) {
        if (quantitySold <= product.quantity) {
          product.quantity -= quantitySold;
          saveProducts();
          displaySale(product, quantitySold);
          clearSalesForm();
          alert('Venta cargada exitosamente. Stock actualizado.');
        } else {
          alert('No hay suficiente stock para realizar la venta.');
        }
      } else {
        alert('El código de producto ingresado no existe.');
      }
    });
  
    function saveProducts() {
      localStorage.setItem('products', JSON.stringify(products));
    }
  
    function displaySale(product, quantitySold) {
      const row = document.createElement('tr');
  
      const codeCell = document.createElement('td');
      codeCell.textContent = product.code;
  
      const nameCell = document.createElement('td');
      nameCell.textContent = product.name;
  
      const quantityCell = document.createElement('td');
      quantityCell.textContent = quantitySold;
  
      const priceCell = document.createElement('td');
      const totalPrice = (product.price * quantitySold).toFixed(2);
      priceCell.textContent = totalPrice;
  
      const dateCell = document.createElement('td');
      const currentDate = new Date().toLocaleDateString();
      dateCell.textContent = currentDate;
  
      row.appendChild(codeCell);
      row.appendChild(nameCell);
      row.appendChild(quantityCell);
      row.appendChild(priceCell);
      row.appendChild(dateCell);
  
      salesTableBody.appendChild(row);
    }
  
    function clearSalesForm() {
      document.getElementById('product-code').value = '';
      document.getElementById('quantity-sold').value = '';
    }
  });
  
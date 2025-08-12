document.addEventListener('DOMContentLoaded', () => {
  const menuData = [
    // Definição do cardápio...
  ];

  const sectors = [
    'Emergência',
    'Trauma',
    'Queimados',
    'Cardiologia',
    'UTI (Terapia Intensiva)',
    'Neurologia',
    'Obstetrícia e Ginecologia',
    'Oncologia',
    'Farmácia',
    'Patologia',
    'Radiologia'
  ];

  const cart = {};
  const qtyIndicators = {};

  function updateIndicators() {
    Object.keys(qtyIndicators).forEach(name => {
      const span = qtyIndicators[name];
      if (cart[name]) {
        span.textContent = cart[name].quantity;
      } else {
        span.textContent = '';
      }
    });
    const cartButton = document.getElementById('cartButton');
    const cartCount = document.getElementById('cartCount');
    const totalItems = Object.values(cart).reduce((sum, entry) => sum + entry.quantity, 0);
    if (totalItems > 0) {
      cartButton.style.display = 'block';
      cartCount.textContent = totalItems;
    } else {
      cartButton.style.display = 'none';
      cartCount.textContent = '0';
    }
  }

  function addToCart(itemName, itemPrice) {
    if (!cart[itemName]) {
      cart[itemName] = { quantity: 1, price: itemPrice };
    } else {
      cart[itemName].quantity++;
    }
    renderCart();
    updateIndicators();
  }

  function renderCart() {
    const cartSection = document.getElementById('cart-section');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    const names = Object.keys(cart);
    if (names.length === 0) {
      cartSection.style.display = 'none';
      cartTotalSpan.textContent = '0,00';
      return;
    }
    cartSection.style.display = 'block';
    names.forEach(name => {
      const entry = cart[name];
      const priceNum = parseFloat(entry.price.replace(',', '.'));
      const itemTotal = priceNum * entry.quantity;
      total += itemTotal;
      const row = document.createElement('div');
      row.className = 'cart-item';
      const nameSpan = document.createElement('span');
      nameSpan.className = 'cart-item-name';
      nameSpan.textContent = name;
      const priceSpan = document.createElement('span');
      priceSpan.className = 'cart-item-price';
      priceSpan.textContent = `R$ ${entry.price}`;
      const controls = document.createElement('div');
      controls.className = 'cart-item-controls';
      const minusBtn = document.createElement('button');
      minusBtn.textContent = '−';
      minusBtn.addEventListener('click', () => updateCart(name, -1));
      const qtySpan = document.createElement('span');
      qtySpan.textContent = entry.quantity;
      qtySpan.style.minWidth = '20px';
      qtySpan.style.textAlign = 'center';
      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => updateCart(name, 1));
      controls.appendChild(minusBtn);
      controls.appendChild(qtySpan);
      controls.appendChild(plusBtn);
      row.appendChild(nameSpan);
      row.appendChild(priceSpan);
      row.appendChild(controls);
      cartItemsContainer.appendChild(row);
    });
    const totalStr = total.toFixed(2).replace('.', ',');
    cartTotalSpan.textContent = totalStr;
  }

  function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';
    Object.keys(qtyIndicators).forEach(key => delete qtyIndicators[key]);

    const leftCategories = ['Salgados', 'Comidinhas', 'Doces'];
    const rightCategories = ['Cafeteria', 'Bebidas', 'Petit Four'];

    function createCategoryBlock(catName) {
      const category = menuData.find(cat => cat.name === catName);
      if (!category) return null;
      const block = document.createElement('div');
      block.className = 'category-block';
      const h3 = document.createElement('h3');
      const iconImg = document.createElement('img');
      iconImg.src = `images/${category.icon}`;
      iconImg.alt = '';
      iconImg.className = 'category-icon';
      const titleSpan = document.createElement('span');
      titleSpan.textContent = category.name;
      h3.appendChild(iconImg);
      h3.appendChild(titleSpan);
      block.appendChild(h3);

      const itemList = document.createElement('div');
      itemList.className = 'category-items';
      category.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'menu-row';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `R$ ${item.price}`;
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.textContent = '+';
        addBtn.className = 'add-btn';
        addBtn.addEventListener('click', () => addToCart(item.name, item.price));
        const qtySpan = document.createElement('span');
        qtySpan.className = 'qty-indicator';
        qtyIndicators[item.name] = qtySpan;

        row.appendChild(nameSpan);
        row.appendChild(priceSpan);
        row.appendChild(addBtn);
        row.appendChild(qtySpan);
        itemList.appendChild(row);
      });
      block.appendChild(itemList);
      return block;
    }

    const leftCol = document.createElement('div');
    leftCol.className = 'menu-col';
    leftCategories.forEach(name => {
      const block = createCategoryBlock(name);
      if (block) leftCol.appendChild(block);
    });
    const rightCol = document.createElement('div');
    rightCol.className = 'menu-col';
    rightCategories.forEach(name => {
      const block = createCategoryBlock(name);
      if (block) rightCol.appendChild(block);
    });

    menuContainer.appendChild(leftCol);
    menuContainer.appendChild(rightCol);
  }

  renderMenu();
  updateIndicators();

  const sectorSelect = document.getElementById('customerSector');
  sectors.forEach(sector => {
    const option = document.createElement('option');
    option.value = sector;
    option.textContent = sector;
    sectorSelect.appendChild(option);
  });

  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', event => {
    event.preventDefault();
    const orderLines = [];
    let totalOrder = 0;
    const names = Object.keys(cart);
    names.forEach(name => {
      const entry = cart[name];
      const qty = entry.quantity;
      const priceStr = entry.price;
      const priceNum = parseFloat(priceStr.replace(',', '.'));
      const itemTotal = priceNum * qty;
      totalOrder += itemTotal;
      const itemTotalStr = itemTotal.toFixed(2).replace('.', ',');
      orderLines.push(`${name}: ${qty} x R$ ${priceStr} = R$ ${itemTotalStr}`);
    });
    if (orderLines.length === 0) {
      alert('Selecione pelo menos um item do cardápio.');
      return;
    }
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerRoom = document.getElementById('customerRoom').value.trim();
    const customerSector = document.getElementById('customerSector').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const consumptionType = document.getElementById('consumptionType').value;
    const totalStr = totalOrder.toFixed(2).replace('.', ',');
    const message =
      `Olá, gostaria de fazer um pedido:\n\n` +
      `Itens selecionados:\n${orderLines.join('\n')}\n\n` +
      `Total do pedido: R$ ${totalStr}\n\n` +
      `Nome: ${customerName}\n` +
      `Telefone: ${customerPhone}\n` +
      `Quarto: ${customerRoom}\n` +
      `Setor: ${customerSector}\n` +
      `Forma de pagamento: ${paymentMethod}\n` +
      `Serviço: ${consumptionType}`;
    const whatsappNumber = '5511918360016'; // Número atualizado
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  });

  const cartButtonElem = document.getElementById('cartButton');
  cartButtonElem.addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' });
  });
});

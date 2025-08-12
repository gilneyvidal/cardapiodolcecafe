document.addEventListener('DOMContentLoaded', () => {
  /**
   * Definição do cardápio. Agora com a categoria Combo Promocional,
   * incluindo os itens e suas descrições com preços.
   */
  const menuData = [
    {
      name: 'Salgados',
      icon: 'salgado.png',
      items: [
        { name: 'Calzone', price: '9,50' },
        { name: 'Coxinha', price: '9,50' },
        { name: 'Croissnat (Pizza | 4 Queijos | Presunto e Queijo)', price: '9,50' },
        { name: 'Esfiha de Carne | Calabresa', price: '9,00' },
        { name: 'Hamburguer C/ Mussarela', price: '11,50' },
        { name: 'Kibe', price: '8,50' },
        { name: 'Pastel De Frango', price: '9,50' },
        { name: 'Pastel Int. Brócolis Ou Ricota', price: '10,00' },
        { name: 'Pão De Batata', price: '8,00' },
        { name: 'Fohado De Presunto', price: '9,50' },
        { name: 'Pão De Queijo', price: '5,00' },
        { name: 'Lanche Natural', price: '19,00' },
        { name: 'Pão Francês', price: '5,00' },
        { name: 'Mini Pizza', price: '12,50' },
        { name: 'Torta De Frango', price: '11,50' }
      ]
    },
    {
      name: 'Cafeteria',
      icon: 'xicara.png',
      items: [
        { name: 'Café', price: '6,00' },
        { name: 'Cappuccino', price: '10,00' },
        { name: 'Média', price: '8,50' },
        { name: 'Chocolate Quente', price: '10,00' }
      ]
    },
    {
      name: 'Bebidas',
      icon: 'xicara.png',
      items: [
        { name: 'Água De Côco', price: '7,00' },
        { name: 'Água S/ Gás | C/ Gás', price: '5,00' },
        { name: 'Refrigerantes', price: '7,50' },
        { name: 'Chá Gelado Ice Tea', price: '9,50' },
        { name: 'Gatorade', price: '10,50' },
        { name: 'Greem People', price: '15,00' },
        { name: 'Iogurte', price: '5,00' },
        { name: 'Suco Del Vale', price: '8,50' },
        { name: 'Todinho', price: '6,00' },
        { name: 'Tônica', price: '7,50' },
        { name: 'Mini Refri', price: '5,00' },
        { name: 'Chá Quente', price: '6,00' }
      ]
    },
    {
      name: 'Comidinhas',
      icon: 'esfiha.png',
      items: [
        { name: 'Comida Brasileito (Pratos Rapidos)', price: '27,50' },
        { name: 'Cremes', price: '26,50' },
        { name: 'Prato Vegetariano', price: '40,00' },
        { name: 'Tapioca Básica', price: '7,00' },
        { name: 'Ovo', price: '13,00' }
      ]
    },
    {
      name: 'Doces',
      icon: 'bolo fatia.png',
      items: [
        { name: 'Halls', price: '4,00' },
        { name: 'Trident', price: '4,00' },
        { name: 'Povilho', price: '8,00' },
        { name: 'Bis', price: '7,00' },
        { name: 'Pururuca', price: '5,00' },
        { name: 'Chocolate 34g', price: '6,00' },
        { name: 'Chocolate 90g', price: '13,50' },
        { name: 'Salgadinho 40g', price: '4,00' },
        { name: 'Baton', price: '3,00' },
        { name: 'Suflair', price: '8,50' },
        { name: 'Paçoca', price: '1,20' },
        { name: 'Mix De Nuts', price: '17,00' },
        { name: 'Castanha', price: '17,00' },
        { name: 'Bolacha Recheada', price: '7,00' }
      ]
    },
    {
      name: 'Petit Four',
      icon: 'bolo decorado.png',
      items: [
        { name: 'Biscoito Petiti Four', price: '9,00' },
        { name: 'Jujuba', price: '7,00' },
        { name: 'Bolo Pedaço', price: '9,50' },
        { name: 'Torta Holandesa', price: '16,00' },
        { name: 'Bolo Festa', price: '16,00' },
        { name: 'Trufa', price: '5,50' },
        { name: 'Pirulito', price: '14,50' },
        { name: 'Tiramissu', price: '14,50' },
        { name: 'T. Morango E Maçã', price: '11,50' },
        { name: 'Quindim', price: '9,50' },
        { name: 'Donuts', price: '10,50' },
        { name: 'Salada De Frutas', price: '16,50' },
        { name: 'Frutas', price: '4,00' }
      ]
    },
    // Nova categoria: Combo Promocional
    {
      name: 'Combo Promocional',
      icon: 'combo_promocional.png', // Você pode adicionar uma imagem representativa aqui
      items: [
        { name: 'Combo 1', price: '22,50', description: 'Pratos do dia (Feijoada)' },
        { name: 'Combo 2', price: '15,50', description: 'Cuscuz com ovo' },
        { name: 'Combo 3', price: '13,50', description: 'Torta de frango + mini refri' },
        { name: 'Combo 4', price: '18,50', description: 'Dolce Calabresa' },
        { name: 'Combo 5', price: '11,00', description: 'Café com leite médio + pão de queijo' },
        { name: 'Combo 6', price: '12,50', description: 'Cappuccino + pão de queijo' }
      ]
    }
  ];

  /**
   * Lista de setores que podem ser selecionados no cardápio.
   */
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

  // Carrinho de compras
  const cart = {};

  // Mapeamento dos indicadores de quantidade de itens no carrinho
  const qtyIndicators = {};

  /**
   * Função para atualizar os indicadores de quantidade ao lado dos botões de adicionar
   */
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

  /**
   * Função para adicionar item ao carrinho
   */
  function addToCart(itemName, itemPrice) {
    if (!cart[itemName]) {
      cart[itemName] = { quantity: 1, price: itemPrice };
    } else {
      cart[itemName].quantity++;
    }
    renderCart();
    updateIndicators();
  }

  /**
   * Função para atualizar a quantidade de um item no carrinho
   */
  function updateCart(itemName, delta) {
    if (!cart[itemName]) return;
    cart[itemName].quantity += delta;
    if (cart[itemName].quantity <= 0) {
      delete cart[itemName];
    }
    renderCart();
    updateIndicators();
  }

  /**
   * Função que renderiza o conteúdo do carrinho na página
   */
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

  /**
   * Função para renderizar o menu de acordo com o cardápio
   */
  function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';
    Object.keys(qtyIndicators).forEach(key => delete qtyIndicators[key]);

    const leftCategories = ['Salgados', 'Comidinhas', 'Doces'];
    const rightCategories = ['Cafeteria', 'Bebidas', 'Petit Four', 'Combo Promocional'];

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

  // Função para rolar até o carrinho ao clicar no botão
  const cartButtonElem = document.getElementById('cartButton');
  cartButtonElem.addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' });
  });
});

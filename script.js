document.addEventListener('DOMContentLoaded', () => {
  /**
   * Definição do cardápio com novos ícones e emojis para os combos promocionais.
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
      name: 'Combo Promocional',
      icon: 'combo_promocional.png',  // Ícone personalizado para os combos
      items: [
        { name: '🥘 Combo Feijoada', price: '22,50', description: 'Pratos do dia (Feijoada)' },
        { name: '🍲 Combo Cuscuz', price: '15,50', description: 'Cuscuz com ovo, saboroso e rápido' },
        { name: '🍗 Combo Frango', price: '13,50', description: 'Torta de frango + mini refri' },
        { name: '🍕 Combo Dolce Calabresa', price: '18,50', description: 'Pizza calabresa com molho especial' },
        { name: '☕ Combo Café & Pão', price: '11,00', description: 'Café com leite médio + pão de queijo' },
        { name: '🍩 Combo Cappuccino', price: '12,50', description: 'Cappuccino + pão de queijo quentinho' }
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
    }
  ];

  // Carrinho de compras
  const cart = {};
  const qtyIndicators = {};

  // Função de atualização do carrinho
  function updateIndicators() {
    Object.keys(qtyIndicators).forEach(name => {
      const span = qtyIndicators[name];
      span.textContent = cart[name] ? cart[name].quantity : '';
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

  // Função para adicionar item ao carrinho
  function addToCart(itemName, itemPrice) {
    if (!cart[itemName]) {
      cart[itemName] = { quantity: 1, price: itemPrice };
    } else {
      cart[itemName].quantity++;
    }
    renderCart();
    updateIndicators();
  }

  // Função para renderizar o carrinho
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

  // Função para renderizar o menu com ícones, emojis e descrições nos combos
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

      // Cabeçalho
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

      // Lista de itens
      const itemList = document.createElement('div');
      itemList.className = 'category-items';
      category.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'menu-row';

        // Caixa (nome + descrição opcional)
        const nameBox = document.createElement('div');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        nameSpan.style.display = 'block';

        nameBox.appendChild(nameSpan);

        if (item.description) {
          const desc = document.createElement('small');
          desc.textContent = item.description;
          desc.style.display = 'block';
          desc.style.marginTop = '2px';
          desc.style.opacity = '0.9';
          desc.style.color = '#ddd'; // boa leitura sobre fundo escuro
          nameBox.appendChild(desc);
        }

        // Preço
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `R$ ${item.price}`;

        // Botão adicionar
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.textContent = '+';
        addBtn.className = 'add-btn';
        addBtn.addEventListener('click', () => addToCart(item.name, item.price));

        // Indicador de quantidade
        const qtySpan = document.createElement('span');
        qtySpan.className = 'qty-indicator';
        qtyIndicators[item.name] = qtySpan;

        // Monta a linha
        row.appendChild(nameBox);
        row.appendChild(priceSpan);
        row.appendChild(addBtn);
        row.appendChild(qtySpan);
        itemList.appendChild(row);
      });
      block.appendChild(itemList);
      return block;
    }

    // Coluna esquerda
    const leftCol = document.createElement('div');
    leftCol.className = 'menu-col';
    leftCategories.forEach(name => {
      const block = createCategoryBlock(name);
      if (block) leftCol.appendChild(block);
    });
    // Decoração inferior esquerda
    const leftBottomDecor = document.createElement('div');
    leftBottomDecor.className = 'decor-bottom';
    const saleiroImg = document.createElement('img');
    saleiroImg.src = 'images/saleiro.png';
    saleiroImg.alt = '';
    saleiroImg.className = 'decor-image';
    leftBottomDecor.appendChild(saleiroImg);
    leftCol.appendChild(leftBottomDecor);

    // Coluna direita
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

  /** Helper: constrói a URL do WhatsApp conforme o dispositivo. */
  function buildWhatsAppURL(number, text) {
    const encoded = encodeURIComponent(text);
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    // No desktop, abrir o Web WhatsApp evita o bug da mensagem em branco do app
    return isMobile
      ? `https://wa.me/${number}?text=${encoded}`
      : `https://web.whatsapp.com/send?phone=${number}&text=${encoded}`;
  }

  // Manipulador de envio do formulário (gera mensagem e abre WhatsApp)
  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', event => {
    event.preventDefault();

    // Linhas do pedido
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

    // Dados do cliente
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerRoom = document.getElementById('customerRoom').value.trim();
    const customerSector = document.getElementById('customerSector').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const consumptionType = document.getElementById('consumptionType').value;

    // Total do pedido
    const totalStr = totalOrder.toFixed(2).replace('.', ',');

    // Mensagem
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

    // Número do WhatsApp de destino (DDI + DDD + número, sem caracteres especiais)
    const whatsappNumber = '5511918360016';

    const whatsappURL = buildWhatsAppURL(whatsappNumber, message);

    // Diagnóstico em caso de troubleshooting
    console.debug('[WA message]', message);
    console.debug('[WA URL]', whatsappURL);

    // Abre em nova aba; se bloqueado, faz fallback navegando na mesma aba
    const win = window.open(whatsappURL, '_blank');
    if (!win) window.location.href = whatsappURL;
  });

  // Botão flutuante para navegar ao carrinho ao clicar
  const cartButtonElem = document.getElementById('cartButton');
  cartButtonElem.addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' });
  });
});

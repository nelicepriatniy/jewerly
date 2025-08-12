//select items

class Select_Item {
  constructor({
    itemClass: item_class,
    defaultStatus: status = false,
    triger: triger,
    active_class: active_class = "active",
  }) {
    this.el = document.querySelector(item_class);
    this.status = status;
    this.triger = triger ? this.el.querySelector(triger) : this.el;
    this.active_class = active_class;
  }

  getEl() {
    return this.el;
  }

  getStatus() {
    return this.status;
  }

  getTriger() {
    return this.triger;
  }

  open() {
    this.el.classList.add(this.active_class);
    this.status = true;
  }
  close() {
    this.el.classList.remove(this.active_class);
    this.status = false;
  }
}

const val = new Select_Item({
  itemClass: ".volute",
  triger: ".select-item-top",
});

if (val) {
  const valTriger = val.getTriger();
  valTriger.onclick = () => {
    val.getStatus() ? val.close() : val.open();
  };
  document.addEventListener("click", function (event) {
    const isClickInside = val.getEl().contains(event.target);
    if (!isClickInside) {
      val.close();
    }
  });
}

const lang = new Select_Item({
  itemClass: ".lang",
  trigger: ".select-item-top",
});

if (lang) {
  const langTriger = lang.getTriger();

  langTriger.onclick = () => {
    lang.getStatus() ? lang.close() : lang.open();
  };
  document.addEventListener("click", function (event) {
    const isClickInside = lang.getEl().contains(event.target);
    if (!isClickInside) {
      lang.close();
    }
  });
}

const header_search = new Select_Item({
  itemClass: ".header-search",
});

if (header_search) {
  const header_search_trigger = header_search.getTriger();

  header_search_trigger.onclick = () => {
    header_search.getStatus() ? header_search.close() : header_search.open();
  };
  document.addEventListener("click", function (event) {
    const isClickInside = header_search.getEl().contains(event.target);
    if (!isClickInside) {
      header_search.close();
    }
  });
}

let cardItems = [
  {
    img: "./media/imgs/bgs/k2.png",
    name: "Название изделия-1",
    art: 102030,
    price: 8190,
    salePrice: 12190,
    size: 25,
  },
  {
    img: "./media/imgs/bgs/k2.png",
    name: "Название изделия-1",
    art: 102031,
    price: 8190,
    salePrice: 12190,
    size: 25,
  },
];

class Card {
  constructor({
    cardClass,
    activeClass = "active",
    status = false,
    items = [],
  }) {
    this.cardEl = document.querySelector(cardClass);
    this.activeClass = activeClass;
    this.status = status;
    this.items = items;
    this.wrapper = this.cardEl.querySelector('.wrapper');
  }

  get el() {
    return this.cardEl;
  }

  get cardItems() {
    return this.items;
  }

  _drawSingleItem(img, name, art, price, salePrice, size, val = '₽', artHead = 'Артикул:', sizeHead = 'Размер:', deleteHead = 'Удалить') {
    return `
      <div class="item" data-price="${price}" data-name="${name}" data-art="${art}" data-val="${val}">
        <img src="${img}" alt="">
        <div class="info">
            <p class="item_heading">${name}</p>
            <p class="acticle">${artHead} ${art}</p>
            <p class="prise">${price} ${val} <span>${salePrice} ${val}</span></p>
            <div class="row last">
                <p class="size">${sizeHead} <span>${size}</span></p>
                <div class="delete">${deleteHead}</div>
            </div>
        </div>
    </div>
    `;
  }

  open() {
    this.cardEl.classList.add(this.activeClass);
  }

  close() {
    this.cardEl.classList.remove(this.activeClass);
  }

  drawItems() {
    this.wrapper.innerHTML = '';

    const html = this.items
      .map(el => this._drawSingleItem(el.img, el.name, el.art, el.price, el.salePrice, el.size))
      .join('');

    this.wrapper.insertAdjacentHTML('beforeend', html);

    this.wrapper.querySelectorAll('.item .delete').forEach(deleteBtn => {
      deleteBtn.onclick = () => {
        const art = deleteBtn.closest('.item').dataset.art;
        this.deleteItem(art);
      };
    });
    this.checkStatus();
  }

  deleteItem(art) {
    this.items = this.items.filter(item => String(item.art) !== String(art));
    this.drawItems();
  }
  addItem(img, name, art, price, salePrice, size) {
    this.items.push({
      img: img,
      name: name,
      art: art,
      price: price,
      salePrice: salePrice,
      size: size,
    })
    this.drawItems();
  }
  checkStatus(){
    let status = false
    this.items.length > 0? status = true : status = false;
    if(status) {
      cardHeader.classList.add('noEmpty')
    } else {
      cardHeader.classList.remove('noEmpty')
    }
    return status
  }
}

const cardHeader = document.querySelector('.header-card')
const closePopups = document.querySelector('.closePupups')


const card = new Card({ cardClass: ".card", items: cardItems});

card.drawItems()

const cardOpener = document.querySelectorAll(".openCard");
cardOpener.forEach((el) => {
  el.onclick = () => {
    card.open();
    closePopups.classList.add('active')
  };
});

const cardCloser = document.querySelectorAll(".closeCard");
cardCloser.forEach((el) => {
  el.onclick = () => {
    card.close();
    closePopups.classList.remove('active')
  };
});


const addToCardItems = document.querySelectorAll('.popular .wrapper .item');

addToCardItems.forEach((el) =>{
  const addToCardBtn = el.querySelector('.add-to-card');
  const img = el.getAttribute('data-img');
  const name = el.getAttribute('data-name');
  const art = el.getAttribute('data-art');
  const price = el.getAttribute('data-price');
  const saleprice = el.getAttribute('data-saleprice');
  const size = el.getAttribute('data-size');
  addToCardBtn.onclick = ()=>{
    card.addItem(img, name, art, price, saleprice, size)
  }
})


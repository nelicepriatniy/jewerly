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
  triger: ".header-search-top",
});

if (header_search) {
  const header_searcha_trigger = header_search.getTriger();
  // debugger
  if (header_searcha_trigger) {
    header_searcha_trigger.onclick = () => {
      header_search.getStatus() ? header_search.close() : header_search.open();
    };
  }

  document.addEventListener("click", function (event) {
    const isClickInside = header_search.getEl().contains(event.target);
    if (!isClickInside) {
      header_search.close();
    }
  });
}

const katSort = new Select_Item({
  itemClass: ".sort.select-item",
});

if (katSort) {
  const header_search_trigger = katSort.getTriger();
  if (header_search_trigger) {
    header_search_trigger.onclick = () => {
      katSort.getStatus() ? katSort.close() : katSort.open();
    };
    document.addEventListener("click", function (event) {
      const isClickInside = katSort.getEl().contains(event.target);
      if (!isClickInside) {
        katSort.close();
      }
    });
  }
}

const katalog_filters_items = document.querySelectorAll(
  ".catalog-hero .filters .item"
);

if (katalog_filters_items.length > 0) {
  katalog_filters_items.forEach((el) => {
    const elTriger = el.querySelector(".heading");
    const moreItemsBtn = el.querySelector(".more");
    const shag = 2;
    let startIndex = 7;

    elTriger.onclick = () => {
      el.classList.toggle("active");
    };

    const elItems = el.querySelectorAll("label");
    if (elItems.length > startIndex) {
      for (let i = 0; i < startIndex; i++) {
        elItems[i].classList.add("active");
      }
      moreItemsBtn.onclick = () => {
        if (startIndex + shag < elItems.length) {
          startIndex = startIndex + shag;
          for (let i = 0; i < startIndex; i++) {
            elItems[i].classList.add("active");
          }
        } else {
          startIndex = elItems.length;
          for (let i = 0; i < startIndex; i++) {
            elItems[i].classList.add("active");
          }
          moreItemsBtn.classList.add("disable");
        }
      };
    } else {
      moreItemsBtn.classList.add("disable");
      elItems.forEach((elItem) => {
        elItem.classList.add("active");
      });
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
    this.wrapper = this.cardEl.querySelector(".wrapper");
  }

  get el() {
    return this.cardEl;
  }

  get cardItems() {
    return this.items;
  }

  _drawSingleItem(
    img,
    name,
    art,
    price,
    salePrice,
    size,
    val = "₽",
    artHead = "Артикул:",
    sizeHead = "Размер:",
    deleteHead = "Удалить"
  ) {
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
    this.wrapper.innerHTML = "";

    const html = this.items
      .map((el) =>
        this._drawSingleItem(
          el.img,
          el.name,
          el.art,
          el.price,
          el.salePrice,
          el.size
        )
      )
      .join("");

    this.wrapper.insertAdjacentHTML("beforeend", html);

    this.wrapper.querySelectorAll(".item .delete").forEach((deleteBtn) => {
      deleteBtn.onclick = () => {
        const art = deleteBtn.closest(".item").dataset.art;
        this.deleteItem(art);
      };
    });
    this.checkStatus();
  }

  deleteItem(art) {
    this.items = this.items.filter((item) => String(item.art) !== String(art));
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
    });
    this.drawItems();
  }
  checkStatus() {
    let status = false;
    this.items.length > 0 ? (status = true) : (status = false);
    if (status) {
      cardHeader.classList.add("noEmpty");
    } else {
      cardHeader.classList.remove("noEmpty");
    }
    return status;
  }
}

const cardHeader = document.querySelector(".header-card");
const closePopups = document.querySelector(".closePupups");

const card = new Card({ cardClass: ".card", items: cardItems });

card.drawItems();

const cardOpener = document.querySelectorAll(".openCard");
cardOpener.forEach((el) => {
  el.onclick = () => {
    card.open();
    closePopups.classList.add("active");
  };
});

const cardCloser = document.querySelectorAll(".closeCard");
cardCloser.forEach((el) => {
  el.onclick = () => {
    card.close();
    closePopups.classList.remove("active");
  };
});

const addToCardItems = document.querySelectorAll(".popular .wrapper .item");

addToCardItems.forEach((el) => {
  const addToCardBtn = el.querySelector(".add-to-card");
  const img = el.getAttribute("data-img");
  const name = el.getAttribute("data-name");
  const art = el.getAttribute("data-art");
  const price = el.getAttribute("data-price");
  const saleprice = el.getAttribute("data-saleprice");
  const size = el.getAttribute("data-size");
  addToCardBtn.onclick = () => {
    card.addItem(img, name, art, price, saleprice, size);
  };
});

const addToCardItemskatalog = document.querySelectorAll(".main-wrapper .item");

addToCardItemskatalog.forEach((el) => {
  const addToCardBtn = el.querySelector(".add-to-card");
  const img = el.getAttribute("data-img");
  const name = el.getAttribute("data-name");
  const art = el.getAttribute("data-art");
  const price = el.getAttribute("data-price");
  const saleprice = el.getAttribute("data-saleprice");
  const size = el.getAttribute("data-size");
  addToCardBtn.onclick = () => {
    card.addItem(img, name, art, price, saleprice, size);
  };
});

const addToCardItemsCard = document.querySelectorAll(".card-hero.item");



addToCardItemsCard.forEach((el) => {
  const addToCardBtn = el.querySelector(".add-to-card");
  const img = el.getAttribute("data-img");
  const name = el.getAttribute("data-name");
  const art = el.getAttribute("data-art");
  const price = el.getAttribute("data-price");
  const saleprice = el.getAttribute("data-saleprice");
  const size = el.getAttribute("data-size");
  addToCardBtn.onclick = () => {
    card.addItem(img, name, art, price, saleprice, size);
  };
});

const price_katalog_min = 0; // минимально возможная цена
const price_katalog_max = 100000; // максимально возможная цена
const katalog_line_end_offset = 14; // отступ правого бегунка от края (px)

const katalog_price_el = document.querySelector(
  ".catalog-hero .filters .price"
);

if (katalog_price_el) {
  const katalog_line = katalog_price_el.querySelector(".line");
  const katalog_line_start = katalog_line.querySelector(".start");
  const katalog_line_end = katalog_line.querySelector(".end");

  let isDragging = false;
  let activeHandle = null;

  // Эффективная ширина (с учетом отступа справа)
  const getEffectiveWidth = () =>
    Math.max(0, katalog_line.offsetWidth - katalog_line_end_offset);

  // Позиция курсора в пределах линии (0..effectiveWidth)
  function getPositionWithinLine(clientX) {
    const rect = katalog_line.getBoundingClientRect();
    let pos = clientX - rect.left;
    const maxPos = getEffectiveWidth();
    return Math.max(0, Math.min(pos, maxPos));
  }

  // Позиция -> цена (нормируем на effectiveWidth)
  function positionToPrice(pos) {
    const w = getEffectiveWidth();
    if (w <= 0) return price_katalog_max; // защита от деления на 0
    const percent = Math.max(0, Math.min(1, pos / w));
    return Math.round(
      price_katalog_min + percent * (price_katalog_max - price_katalog_min)
    );
  }

  // Обновление позиции бегунков с ограничениями
  function updateHandlePosition(handle, pos) {
    const w = getEffectiveWidth();
    const startPos = parseFloat(katalog_line_start.dataset.pos ?? 0);
    const endPos = parseFloat(katalog_line_end.dataset.pos ?? w);

    if (handle === katalog_line_start) {
      pos = Math.min(Math.max(0, pos), endPos); // 0 .. endPos
      katalog_line_start.dataset.pos = pos;
      katalog_line_start.style.transform = `translateX(${pos}px) translateY(-50%)`;
    } else if (handle === katalog_line_end) {
      pos = Math.max(pos, startPos); // startPos .. w
      pos = Math.min(pos, w);
      katalog_line_end.dataset.pos = pos;
      katalog_line_end.style.transform = `translateX(${pos}px) translateY(-50%)`;
    }

    // Текущие цены
    const minPrice = positionToPrice(
      parseFloat(katalog_line_start.dataset.pos)
    );
    const maxPrice = positionToPrice(parseFloat(katalog_line_end.dataset.pos));

    // console.log(`Диапазон цен: ${minPrice} — ${maxPrice}`);
    const priceEndInput = document.querySelector(
      ".catalog-hero .filters .price-end"
    );
    document.querySelector(".catalog-hero .filters .price-start").value =
      minPrice;
    priceEndInput.dispatchEvent(new Event("input"));
    const priceStartInput = document.querySelector(
      ".catalog-hero .filters .price-end"
    );
    document.querySelector(".catalog-hero .filters .price-end").value =
      maxPrice;
    priceStartInput.dispatchEvent(new Event("input"));
  }

  // Старт drag
  function startDrag(handle, clientX) {
    isDragging = true;
    activeHandle = handle;
    updateHandlePosition(handle, getPositionWithinLine(clientX));
  }

  // Move
  function moveDrag(clientX) {
    if (!isDragging || !activeHandle) return;
    updateHandlePosition(activeHandle, getPositionWithinLine(clientX));
  }

  // Конец drag
  function endDrag() {
    isDragging = false;
    activeHandle = null;
  }

  // Мышь
  [katalog_line_start, katalog_line_end].forEach((handle) => {
    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startDrag(handle, e.clientX);
    });
  });
  document.addEventListener("mousemove", (e) => moveDrag(e.clientX));
  document.addEventListener("mouseup", endDrag);

  // Тач
  [katalog_line_start, katalog_line_end].forEach((handle) => {
    handle.addEventListener(
      "touchstart",
      (e) => {
        const t = e.touches[0];
        startDrag(handle, t.clientX);
      },
      { passive: false }
    );
  });
  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX);
    },
    { passive: false }
  );
  document.addEventListener("touchend", endDrag);

  // Инициализация позиций (весь диапазон: 0 .. effectiveWidth)
  const init = () => {
    const w = getEffectiveWidth();
    katalog_line_start.dataset.pos = 0;
    katalog_line_end.dataset.pos = w;
    katalog_line_start.style.transform = `translateX(0px) translateY(-50%)`;
    katalog_line_end.style.transform = `translateX(${w}px) translateY(-50%)`;
  };

  // Инициализация после отрисовки
  requestAnimationFrame(init);

  // (Опционально) Пересчет при ресайзе, чтобы диапазон не "уплывал"
  window.addEventListener("resize", init);
}

const katsFilsers = document.querySelector(".catalog-hero .filters");

if (katsFilsers) {
  const tags = document.querySelector(".catalog-hero .items-wrapper .tags");
  const allItems = document.querySelectorAll(
    ".catalog-hero .items-wrapper .main-wrapper .item"
  );

  const priceStart = document.querySelector(".price-mid .price-start");
  const priceEnd = document.querySelector(".price-mid .price-end");

  const akciaInput = katsFilsers.querySelector(".akcia input");

  akciaInput.onchange = () => {
    reclassesWrapperItems(allItems);
  };
  priceStart.addEventListener("input", () => {
    console.log(123);
  });
  priceEnd.oninput = () => {
    reclassesWrapperItems(allItems);
  };

  const katsFilsersKat = katsFilsers.querySelectorAll('[name="kat"]');
  let katFiltersKatList = [];
  const katsFilsersKam = katsFilsers.querySelectorAll('[name="kam"]');
  let katFiltersKamList = [];
  const katsFilsersZnak = katsFilsers.querySelectorAll('[name="znak"]');
  let katFiltersZnakList = [];
  let allFilters = katFiltersKatList.concat(
    katFiltersKamList,
    katFiltersZnakList
  );

  // Функция для обновления рендеринга и кликов
  function renderSingleTag(text) {
    return `
      <div class="item" data-inp-val="${text}">
          ${text}
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 4.25L3.75 11.75M3.75 4.25L11.25 11.75" stroke="#878F99"
                  stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </div>
    `;
  }

  function renderTag(mass, elem) {
    elem.innerHTML = "";
    mass.forEach((el) => {
      elem.insertAdjacentHTML("beforeend", renderSingleTag(el));
    });
    // Повторное назначение обработчиков после перерисовки
    elem.querySelectorAll(".item").forEach((tagEl) => {
      tagEl.addEventListener("click", () => {
        const val = tagEl.getAttribute("data-inp-val");
        katFiltersKatList = katFiltersKatList.filter((v) => v !== val);
        katFiltersKamList = katFiltersKamList.filter((v) => v !== val);
        katFiltersZnakList = katFiltersZnakList.filter((v) => v !== val);

        // Снимаем чекбоксы, если они соответствуют тегу
        katsFilsers
          .querySelectorAll(`input[value="${val}"]`)
          .forEach((inp) => (inp.checked = false));

        allFilters = katFiltersKatList.concat(
          katFiltersKamList,
          katFiltersZnakList
        );
        renderTag(allFilters, tags);
        console.log(allFilters);
        reclassesWrapperItems(allItems);
      });
    });
  }

  function updateFiltersAndRender() {
    allFilters = katFiltersKatList.concat(
      katFiltersKamList,
      katFiltersZnakList
    );
    renderTag(allFilters, tags);
  }

  // Обработка кат
  katsFilsersKat.forEach((el) => {
    if (el.checked) katFiltersKatList.push(el.value);
    el.addEventListener("click", () => {
      if (el.checked) {
        katFiltersKatList.push(el.value);
      } else {
        katFiltersKatList = katFiltersKatList.filter((v) => v !== el.value);
      }
      updateFiltersAndRender();
      reclassesWrapperItems(allItems);
    });
  });

  // Обработка кам
  katsFilsersKam.forEach((el) => {
    if (el.checked) katFiltersKamList.push(el.value);
    el.addEventListener("click", () => {
      if (el.checked) {
        katFiltersKamList.push(el.value);
      } else {
        katFiltersKamList = katFiltersKamList.filter((v) => v !== el.value);
      }
      updateFiltersAndRender();
      reclassesWrapperItems(allItems);
    });
  });

  // Обработка знак
  katsFilsersZnak.forEach((el) => {
    if (el.checked) katFiltersZnakList.push(el.value);
    el.addEventListener("click", () => {
      if (el.checked) {
        katFiltersZnakList.push(el.value);
      } else {
        katFiltersZnakList = katFiltersZnakList.filter((v) => v !== el.value);
      }
      updateFiltersAndRender();
      reclassesWrapperItems(allItems);
    });
  });

  // Первичная отрисовка
  if (tags) {
    const allTags = katFiltersKatList.concat(
      katFiltersKamList,
      katFiltersZnakList
    );
    renderTag(allTags, tags);
  }
  function reclassesWrapperItems(elems) {
    elems.forEach((el) => {
      const elKat = el.getAttribute("data-kat");
      const elKam = el.getAttribute("data-kam");
      const elKznak = el.getAttribute("data-znak");
      const elSale = el.getAttribute("data-akcia");
      const elPrice = el.getAttribute("data-price");

      // Проверяем каждый фильтр. Если список фильтров пустой — считаем, что все элементы проходят
      const elKatShow =
        katFiltersKatList.length === 0 || katFiltersKatList.includes(elKat);
      const elKamShow =
        katFiltersKamList.length === 0 || katFiltersKamList.includes(elKam);
      const elZnakShow =
        katFiltersZnakList.length === 0 || katFiltersZnakList.includes(elKznak);

      let elAkciaShow = true;
      if (akciaInput.checked) {
        elAkciaShow = !!elSale;
      }

      let elPriceShow = true;
      if (priceStart.value || priceEnd.value) {
        const price = Number(elPrice);
        const start = Number(priceStart.value) || 0;
        const end = Number(priceEnd.value) || Infinity;
        elPriceShow = price >= start && price <= end;
      }

      // Если элемент проходит все фильтры — показываем, иначе скрываем
      if (elKatShow && elKamShow && elZnakShow && elAkciaShow && elPriceShow) {
        el.classList.remove("disable");
      } else {
        el.classList.add("disable");
      }
    });
  }

  reclassesWrapperItems(allItems);
}

//card logick

const cardHero = document.querySelector(".card-hero");

if (cardHero) {
  const cardSliderItems = cardHero.querySelectorAll(
    ".card-slider-slide-wrapper .item"
  );
  const cardSliderMain = cardHero.querySelector(".card-slider-main img");

  cardSliderItems.forEach((el) => {
    el.onclick = () => {
      const src = el.querySelector('img').getAttribute('src')
      
      
      cardSliderMain.setAttribute("src", src);
    };
  });
}


//card buy now

const cardBuyNowBtn = document.querySelector('.buy-now');

if(cardBuyNowBtn) {
  const boyNowPopup = document.querySelector('.paymentPopup')
  const closePopups = document.querySelector('.close-popups')
  const buyPopupCloseBtn = boyNowPopup.querySelector('.payment-popup-close')
  cardBuyNowBtn.onclick = ()=>{
    boyNowPopup.classList.add('active');
    closePopups.classList.add('active');
  }
  buyPopupCloseBtn.onclick = ()=>{
    boyNowPopup.classList.remove('active');
    closePopups.classList.remove('active');
  }
  closePopups.onclick = ()=>{
    boyNowPopup.classList.remove('active');
    closePopups.classList.remove('active');
  }
}
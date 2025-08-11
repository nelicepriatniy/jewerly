//select items 

class Select_Item {
    constructor({itemClass: item_class, defaultStatus: status = false, triger: triger, active_class: active_class = 'active'}) {
        this.el = document.querySelector(item_class);
        this.status = status;
        this.triger = triger ? this.el.querySelector(triger) : this.el;
        this.active_class = active_class;
    }

    getEl(){
        return this.el;
    }

    getStatus(){
        return this.status;
    }
    
    getTriger(){
        return this.triger;
    }

    open(){
        this.el.classList.add(this.active_class)
        this.status = true
    }
    close(){
        this.el.classList.remove(this.active_class)
        this.status = false
    }
}

const val = new Select_Item({
    itemClass: '.volute',
    triger: '.select-item-top'
});

if(val) {
    const valTriger = val.getTriger();
    valTriger.onclick = ()=>{
        val.getStatus() ? val.close() : val.open();
    }
    document.addEventListener('click', function (event) {
        const isClickInside = val.getEl().contains(event.target);
        if(!isClickInside) {
            val.close()
        }
    })
}

const lang = new Select_Item({
    itemClass: '.lang',
    trigger: '.select-item-top'
});

if(lang) {
    const langTriger = lang.getTriger();
    
    langTriger.onclick = ()=>{
        lang.getStatus() ? lang.close() : lang.open();
    }
    document.addEventListener('click', function (event) {
        const isClickInside = lang.getEl().contains(event.target);
        if(!isClickInside) {
            lang.close()
        }
    })
}


const header_search = new Select_Item({
    itemClass: '.header-search',
})

if(header_search) {
    const header_search_trigger = header_search.getTriger();
    
    header_search_trigger.onclick = ()=>{
        header_search.getStatus() ? header_search.close() : header_search.open();
    }
    document.addEventListener('click', function (event) {
        const isClickInside = header_search.getEl().contains(event.target);
        if(!isClickInside) {
            header_search.close()
        }
    })
}
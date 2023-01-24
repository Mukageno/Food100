const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1000,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 200
    },
    lettuce: {
        name: 'Салатный лист',
        price: 2000,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 3000,
        kcall: 80
    }
}
const BPOM            = document.querySelectorAll('.main__product-btn'),
      checkExtraProd  = document.querySelectorAll('.main__product-checkbox'),
      addCart         = document.querySelector('.addCart'),
      receipt         = document.querySelector('.receipt'),
      receiptOut      = receipt.querySelector('.receipt__window-out'),
      receiptWindow   = receipt.querySelector('.receipt__window'),
      receiptBtn      = receipt.querySelector('.receipt__window-btn')
for (let i = 0; i < BPOM.length; i++) {
    BPOM[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}
function plusOrMinus(POM) {
    const parent   = POM.closest('.main__product'),
          parentID = parent.getAttribute('id'),
          out      = parent.querySelector('.main__product-num'),
          price    = parent.querySelector('.main__product-price span'),
          kcall    = parent.querySelector('.main__product-kcall span'),
          POMType  = POM.getAttribute('data-symbol')
          if (POMType == '+' && product[parentID].amount < 10) product[parentID].amount++ 
          else if (POMType == '-' && product[parentID].amount > 0) product[parentID].amount--
          out.innerHTML = product[parentID].amount
          price.innerHTML = product[parentID].Summ
          kcall.innerHTML = product[parentID].Kcall
}

for (let i = 0; i < checkExtraProd.length; i++) {
    checkExtraProd[i].addEventListener('click', function () {
        addExtraProd(this)
    })
}

function addExtraProd(EP) {
    const parent   = EP.closest('.main__product'),
          parentID = parent.getAttribute('id'),
          price    = parent.querySelector('.main__product-price span'),
          kcall    = parent.querySelector('.main__product-kcall span'),
          EPType  = EP.getAttribute('data-extra')
          product[parentID][EPType] = EP.checked
          if ( product[parentID][EPType] == true) {
            product[parentID].kcall += extraProduct[EPType].kcall
            product[parentID].price += extraProduct[EPType].price
          }else{
            product[parentID].kcall -= extraProduct[EPType].kcall
            product[parentID].price -= extraProduct[EPType].price
          }
          price.innerHTML = product[parentID].Summ
          kcall.innerHTML = product[parentID].Kcall
}

addCart.addEventListener('click', function () {
    let arrayProduct = [],
        totalName    = '',
        totalPrice   = 0,
        totalKcall   = 0
    for (const key in product) {
        const po =product[key]
        if(po.amount > 0){
            arrayProduct.push(po)
            po.name += ' (кол ' + po.amount + ')'
            for (const infokey in po) {
                if (po[infokey] === true) {
                    po.name += '\n' + extraProduct[infokey].name
                }
            }
        }
        po.price = po.Summ
        po.kcall = po.Kcall
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i]
        totalPrice += el.price
        totalKcall += el.kcall
        totalName += '\n' + el.name + '\n'
    }
    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость заказа ${totalPrice} сум`
    receipt.style.display = 'flex'
    setTimeout(() => {
        receipt.style.opacity = '1'
    }, 100);
    setTimeout(() => {
        receiptWindow.style.top = '0'
    }, 200);
    
    const outNum = document.querySelectorAll('.main__product-num');
    for (let i = 0; i < outNum.length; i++) {
        outNum[i].innerHTML = 0
    }
})
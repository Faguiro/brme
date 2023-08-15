import React, { useEffect } from 'react'
import './style.global.css'

const PdpFormat = () => {
  function parsePrice(element) {
    var price = element.textContent.replace('R$', '').replace(',', '.').trim()
    price = parseFloat(price)
    return price
  }

  function porcentagem(price, percent) {
    let newPrice = price * (percent / 100)
    return price - newPrice
  }

  function replaceSellerText() {
    try {
      var sellerContainer = document.querySelector(
        '.vtex-product-price-1-x-sellerNameContainer'
      )
      var sellerText = sellerContainer.textContent.trim()

      if (sellerText.includes('Vendido por:')) {
        sellerContainer.textContent = sellerText.replace(
          'Vendido por:',
          'Vendido e entregue por:'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  function insertDiscountDiv() {


    try {
      var sellerNameElement = document.querySelector( '.vtex-product-price-1-x-sellerName' )
      
      var priceElement = document.querySelector( '.vtex-product-price-1-x-sellingPriceValue' )
      
      const motherDiv = priceElement.closest('.vtex-flex-layout-0-x-flexColChild.pb0');
      const newSiblingDiv = document.createElement('div');
      newSiblingDiv.className = 'bme10PercentDiscount';
      motherDiv.parentNode.insertBefore(newSiblingDiv, motherDiv);
      
      var installmentsElement = document.querySelector( '.vtex-product-price-1-x-installments' )
     
      var sellerNameText = sellerNameElement.textContent.trim()

      if (sellerNameText.includes('BR-ME')) {
        var discountDiv =document.createElement('span')
        discountDiv.setAttribute('id', 'discountDiv')     

        var priceDiscount = document.createElement('span')
        discountDiv.style = 'font-size: 13px; color: #7b343b; display:block'
        priceDiscount.style = 'font-size: 30px; color: #7b343b; display:block, font-weight: 700'

        var prices = parsePrice(priceElement)
        var discount = porcentagem(prices, 10)
        var discount_format = discount.toFixed(2).replace('.', ',')

        priceDiscount.textContent='R$ '+ discount_format 
        priceDiscount.setAttribute('id', 'priceDiv') 
        discountDiv.textContent = ' à vista'+ ' no PIX com 10% de desconto'

        newSiblingDiv.prepend(discountDiv) 
        newSiblingDiv.prepend(priceDiscount)
        
        let textPrice = priceElement.textContent
        let textInstallments = installmentsElement.textContent.toLowerCase()
        textInstallments = textInstallments.replace('r$','R$')
        installmentsElement.textContent = textPrice + ' ' + textInstallments 
        installmentsElement.style = 'margin-top:13px; font-size: 13px; color: #7b343b; display:block'      
              
        motherDiv.style = 'display:none;'

      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    insertDiscountDiv();
    replaceSellerText();
  }, [])

  return <></>
}

export { PdpFormat }

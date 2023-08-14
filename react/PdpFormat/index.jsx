import React, { useEffect } from 'react'
// import { Container } from './styles';
//import './style.global.css'

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
      var sellerNameElement = document.querySelector(
        '.vtex-product-price-1-x-sellerName'
      )
      var priceElement = document.querySelector(
        '.vtex-product-price-1-x-sellingPriceValue'
      )
      var installmentsElement = document.querySelector(
        '.vtex-flex-layout-0-x-flexColChild'
      )
      var sellerNameText = sellerNameElement.textContent.trim()
      if (sellerNameText.includes('BR-ME')) {
        var discountDiv = document.createElement('span')
        discountDiv.style = 'font-size: 13px; color: #7b343b;'
        var prices = parsePrice(priceElement)
        var discount = porcentagem(prices, 10)
        var discount_format = discount.toFixed(2).replace('.', ',')
        discountDiv.textContent =
          'R$ '+ discount_format +' à vista'+ ' no PIX com 10% de desconto'
        priceElement.parentNode.append(discountDiv, priceElement)
        discountDiv.parentNode.style =
          'display: flex; flex-direction: column-reverse;'
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    insertDiscountDiv();
    replaceSellerText();
  }, [])

  return <script>replaceSellerText();</script>
}

export { PdpFormat }

import React, { useEffect } from 'react'
import './style.global.css'

const PdpFormat = () => {

 const parsePrice = (element) => {
  const priceText = element.textContent
    .replace(/[^\d,.]/g, '') // Remove caracteres não numéricos, exceto vírgula e ponto
    .replace('.', '') // Remove os pontos de separação das milhares
    .replace(',', '.'); // Troca a vírgula decimal por ponto
  return parseFloat(priceText);
};

  function porcentagem(price, percent) {
    let newPrice = price * (percent / 100)
    return price - newPrice
  }
  const calculateDiscount = (price, percent) => {
    let discount = price * (percent / 100)
    return price - discount
  }
  const formatPrice = price => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
      /* console.log(error) */
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

      const motherDiv = priceElement.closest(
        '.vtex-flex-layout-0-x-flexColChild.pb0'
      )
      const newSiblingDiv = document.createElement('div')
      newSiblingDiv.className = 'bme10PercentDiscount'
      motherDiv.parentNode.insertBefore(newSiblingDiv, motherDiv)

      var sellerNameText = sellerNameElement.textContent.trim()
      

      if (sellerNameText.includes('BR-ME')) {
        var discountDiv = document.createElement('span')
        discountDiv.setAttribute('id', 'discountDiv')

        var priceDiscount = document.createElement('span')
        discountDiv.style = 'font-size: 13px; color: #7b343b; display:block'
        priceDiscount.style =
          'font-size: 30px; color: #7b343b; display:block, font-weight: 700'

        var prices = parsePrice(priceElement)
        var discount = porcentagem(prices, 10)
        var discount_format = discount.toFixed(2).replace('.', ',')

        priceDiscount.textContent = 'R$ ' + discount_format
        priceDiscount.setAttribute('id', 'priceDiv')
        discountDiv.textContent = ' à vista' + ' no PIX com 10% de desconto'

        newSiblingDiv.prepend(discountDiv)
        newSiblingDiv.prepend(priceDiscount)

        let installmentsElement = document.querySelector(
          '.vtex-product-price-1-x-installments'
        )
        let textPrice = priceElement.textContent
        let textInstallments = installmentsElement.textContent.toLowerCase()
        textInstallments = textInstallments.replace('r$', 'R$')
        installmentsElement.textContent = textPrice + ' ' + textInstallments
        installmentsElement.style =
          'margin-top:13px; font-size: 13px; color: #7b343b; display:block'

        motherDiv.style = 'display:none;'
      } 
      else {
       
        function ajustarParcelas(parcelas) {
          // Ajustar número de parcelas para 3
          parcelas.textContent = '3'
  
          // Ajustar valor da parcela
          let newInstallmentValue =
            calculateDiscount(parsePrice(priceElement), 0) / 3
          let newInstallmentFormat = formatPrice(newInstallmentValue)
          let newInstallmentElement = document.querySelector(
            '.vtex-product-price-1-x-installmentValue'
          )
          newInstallmentElement.innerHTML = `<span class="vtex-product-price-1-x-currencyContainer vtex-product-price-1-x-currencyContainer">
          <span class="vtex-product-price-1-x-currencyCode vtex-product-price-1-x-currencyCode"></span>
          <span class="vtex-product-price-1-x-currencyLiteral vtex-product-price-1-x-currencyLiteral">&nbsp;</span>
          <span class="vtex-product-price-1-x-currencyInteger vtex-product-price-1-x-currencyInteger">${newInstallmentFormat}</span>
        </span>`
        }
       
        let parcelas = document.querySelector(
          '.vtex-product-price-1-x-installmentsNumber'
        )
        if (parcelas.textContent != '1' && parcelas.textContent != '2') {
          
          ajustarParcelas(parcelas)
        }
      }
    } catch (error) {
      /*  console.log(error) */
    }
  }
  useEffect(() => {
    insertDiscountDiv()
    replaceSellerText()
  }, [])

  return <></>
}



export { PdpFormat }

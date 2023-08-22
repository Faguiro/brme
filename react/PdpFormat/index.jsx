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
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    insertDiscountDiv()
    replaceSellerText()
  }, [])

  return <></>
}

const parsePrice = element => {
  const price = element.textContent.replace('R$', '').replace(',', '.').trim()
  return parseFloat(price)
}

const calculateDiscount = (price, percent) => {
   let discount = price * (percent / 100)
   return price - discount
}

const formatPrice = price => {
  return 'R$ ' + price.toFixed(2).replace('.', ',')
}

const createDiscountDiv = discountFormat => {
  const discountDiv = document.createElement('span')
  discountDiv.setAttribute('id', 'discountDiv')
  discountDiv.style = 'font-size: 13px; color: #7b343b; display: block'
  discountDiv.textContent = ' à vista' + ' no PIX com 10% de desconto'
  return discountDiv
}

const createPriceDiscount = discountFormat => {
  const priceDiscount = document.createElement('span')
  priceDiscount.style =
    'font-size: 30px; color: #7b343b; display: block; font-weight: 700'
  priceDiscount.textContent = discountFormat
  priceDiscount.setAttribute('id', 'priceDiv')
  return priceDiscount
}

const replaceSellerText = sellerContainer => {
  try {
    const sellerText = sellerContainer.textContent.trim()
    if (sellerText.includes('Vendido por:')) {
      sellerContainer.textContent = sellerText.replace(
        'Vendido por:',
        'Vendido e entregue por:'
      )
      sellerContainer.style = 'font-size:11px'
    }
  } catch (error) {
    console.log(error)
  }
}

const insertDiscountDiv = productContainer => {
  try {
    const sellerNameElement = productContainer.querySelector(
      '.vtex-product-price-1-x-sellerName'
    )
    const priceElement = productContainer.querySelector(
      '.vtex-product-price-1-x-sellingPriceValue'
    )
    const installmentsElement = productContainer.querySelector(
      '.vtex-product-price-1-x-installments--summary'
    )

    const sellerNameText = sellerNameElement.textContent.trim()

    if (sellerNameText.includes('BR-ME')) {
      const discount = calculateDiscount(parsePrice(priceElement), 10)
      const discountFormat = formatPrice(discount)
      const discountDiv = createDiscountDiv(discountFormat)
      const priceDiscount = createPriceDiscount(discountFormat)

      const motherDiv = priceElement.closest(
        '.vtex-flex-layout-0-x-stretchChildrenWidth'
      )
      const newSiblingDiv = document.createElement('div')
      newSiblingDiv.className = 'bme10PercentDiscount'
      motherDiv.parentNode.insertBefore(newSiblingDiv, motherDiv)
      motherDiv.remove()
      let div = productContainer.querySelector(
        '.vtex-flex-layout-0-x-stretchChildrenWidth'
      )
      div.remove()

      discountDiv.prepend(priceDiscount)
      newSiblingDiv.append(discountDiv)
      newSiblingDiv.append(installmentsElement)

      const textPrice = priceElement.textContent
      let textInstallments = installmentsElement.textContent.toLowerCase()
      textInstallments = textInstallments.replace('r$', 'R$')
      installmentsElement.textContent = textPrice + ' ' + textInstallments
      installmentsElement.style =
        'margin-top: 10px; font-size: 13px; color: #7b343b; display: block'
    }
  } catch (error) {
    //console.log(error);
  }
}

const ShelfFormat = () => {
  useEffect(() => {
    const productContainers = document.querySelectorAll(
      '.vtex-slider-layout-0-x-slide--shelf'
    )

    productContainers.forEach(productContainer => {
      insertDiscountDiv(productContainer)
      const sellerContainer = productContainer.querySelector(
        '.vtex-product-price-1-x-sellerNameContainer'
      )
      replaceSellerText(sellerContainer)
    })
  }, [])

  return <></>
}

export { PdpFormat, ShelfFormat }

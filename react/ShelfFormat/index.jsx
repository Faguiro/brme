import React, { useEffect } from 'react'
import './style.global.css'

const parsePrice = element => {
  const priceText = element.textContent
    .replace(/[^\d,.]/g, '') // Remove caracteres não numéricos, exceto vírgula e ponto
    .replace('.', '') // Remove os pontos de separação das milhares
    .replace(',', '.') // Troca a vírgula decimal por ponto
  return parseFloat(priceText)
}

const calculateDiscount = (price, percent) => {
  let discount = price * (percent / 100)
  return price - discount
}

const formatPrice = price => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
    /* console.log(error) */
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
    } else {
      function ajustarParcelas(parcelas) {
        // Ajustar número de parcelas para 3
        parcelas.textContent = '3'

        // Ajustar valor da parcela
        let newInstallmentValue =
          calculateDiscount(parsePrice(priceElement), 0) / 3
        let newInstallmentFormat = formatPrice(newInstallmentValue)
        let newInstallmentElement = productContainer.querySelector(
          '.vtex-product-price-1-x-installmentValue--summary'
        )
        newInstallmentElement.innerHTML = `<span class="vtex-product-price-1-x-currencyContainer vtex-product-price-1-x-currencyContainer--summary">
        <span class="vtex-product-price-1-x-currencyCode vtex-product-price-1-x-currencyCode--summary"></span>
        <span class="vtex-product-price-1-x-currencyLiteral vtex-product-price-1-x-currencyLiteral--summary">&nbsp;</span>
        <span class="vtex-product-price-1-x-currencyInteger vtex-product-price-1-x-currencyInteger--summary">${newInstallmentFormat}</span>
      </span>`
      }

      let parcelas = productContainer.querySelector(
        '.vtex-product-price-1-x-installmentsNumber--summary'
      )
      if (parcelas.textContent != '1' && parcelas.textContent != '2') {
        ajustarParcelas(parcelas)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const ShelfFormat = () => {
  useEffect(() => {
   
   
    let productContainers
    try {
      const productContainers_gallery = document.querySelectorAll(
        '.vtex-search-result-3-x-galleryItem.vtex-search-result-3-x-galleryItem'
      )
      
      if (productContainers_gallery.length > 0) {
        //console.log('Página principal!')
        productContainers = productContainers_gallery

        productContainers.forEach(productContainer => {
          insertDiscountDiv(productContainer)
          let sellerContainer = productContainer.querySelector(
            '.vtex-product-price-1-x-sellerNameContainer'
          )
          replaceSellerText(sellerContainer)
        })
      }
    } catch (error) {}
    try {
      const productContainers_home = document.querySelectorAll(
        '.vtex-slider-layout-0-x-slide--shelf'
      )
      if (productContainers_home.length > 0) {
        //console.log('Página principal!')
        productContainers = productContainers_home

        productContainers.forEach(productContainer => {
          insertDiscountDiv(productContainer)
          let sellerContainer = productContainer.querySelector(
            '.vtex-product-price-1-x-sellerNameContainer'
          )
          replaceSellerText(sellerContainer)
        })
      }
    } catch (error) {}
  }, [])

  return <></>
}

export { ShelfFormat }

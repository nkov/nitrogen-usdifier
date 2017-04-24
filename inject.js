const API_URL = 'https://api.cryptonator.com/api/ticker/btc-usd'
let rate = 1024.0

const usdString = (btc) => (btc * rate).toLocaleString(undefined, { style: 'currency', currency: 'USD' })

// new wagers
const updateWagers = () => {
  $('.betslip-row').css('padding-bottom', '25px')
  $('input.betslip-row-wager-risk-textbox').each(idx => {
    const input = $('input.betslip-row-wager-risk-textbox').eq(idx)
    const output = $('input.betslip-row-wager-towin-textbox').eq(idx)
    const val = usdString(input.val())
    const win = usdString(output.val())
    const usdInput = $(`#usd-val-${idx}`)
    if (usdInput.length) {
      usdInput.text(`(${val})`)
      $('#usd-win-' + idx).text(`(${win})`)
    } else {
      input.parent().after(`<div style='padding: 0.5em 0' id='usd-val-${idx}'>(${val})</div>`)
      output.parent().after(`<div style='padding: 0.5em 0' id='usd-win-${idx}'>(${win})</div>`)
    }
  })
}

// new parlay
const updateParlay = () => {
  $('#parlay-info').css('padding-bottom', '25px')
  const input = $('input#betslip-parlay-risk-textbox')
  const output = $('input#betslip-parlay-towin-textbox')
  const val = usdString(input.val())
  const win = usdString(output.val())
  const usdInput = $('#parlay-usd-val')
  if (usdInput.length) {
    usdInput.text(`(${val})`)
    $('#parlay-usd-win').text(`(${win})`)
  } else {
    input.parent().after(`<div style='padding: 0.5em 0' id='parlay-usd-val'>(${val})</div>`)
    output.parent().after(`<div style='padding: 0.5em 0' id='parlay-usd-win'>(${win})</div>`)
  }
}

// active slips
const updateSlips = () => {
  $('.mywager-table-row2').each(idx => {
    const slip = $('.mywager-table-row2').eq(idx)
    const wager = usdString(parseFloat(slip.children().eq(6).text()))
    const win = usdString(parseFloat(slip.children().eq(7).text()))
    const usdWager = $(`span#wager-usd-${idx}`)
    if (usdWager.length) {
      usdWager.text(` (${wager})`)
      $('span#win-usd-' + idx).text(` (${win})`)
    } else {
      slip.children().eq(6).append(`<span id='wager-usd-${idx}'> (${wager})</span>`)
      slip.children().eq(7).append(`<span id='win-usd-${idx}'> (${win})</span>`)
    }
  })
  $('.mywager-parlay-row').each(idx => {
    const slip = $('.mywager-parlay-row').eq(idx)
    const wager = usdString(parseFloat(slip.children().eq(2).text()))
    const win = usdString(parseFloat(slip.children().eq(3).text()))
    const usdWager = $(`span#parley-wager-usd-${idx}`)
    if (usdWager.length) {
      usdWager.text(` (${wager})`)
      $('span#parley-win-usd-' + idx).text(` (${win})`)
    } else {
      slip.children().eq(2).append(`<span id='parley-wager-usd-${idx}'> (${wager})</span>`)
      slip.children().eq(3).append(`<span id='parley-win-usd-${idx}'> (${win})</span>`)
    }
  })
}

(function() {
  'use strict'
  $('#find-games-container').on('keyup', 'input.betslip-row-wager-risk-textbox', updateWagers)
  $('#find-games-container').on('keyup', 'input.betslip-row-wager-towin-textbox', updateWagers)
  $('#find-games-container').on('keyup', 'input#betslip-parlay-risk-textbox', updateParlay)
  $('#find-games-container').on('keyup', 'input#betslip-parlay-towin-textbox', updateParlay)
  fetch(API_URL)
    .then(res => res.json())
    .then(res => {
      rate = parseFloat(res.ticker.price)
      const balance = usdString(parseFloat($('span#nav-balance-value').text()))
      const inPlay = usdString(parseFloat($('span#nav-inplay-value').text()))
      const balanceUsd = $('span#nav-balance-value-usd')
      if (balanceUsd.length) {
        balanceUsd.text(` (${balance})`)
        $('span#nav-inplay-value-usd').text(` (${inPlay})`)
      } else {
        $('span#nav-balance-value').after(`<span id='nav-balance-value-usd'> (${balance})</span>`)
        $('span#nav-inplay-value').after(`<span id='nav-inplay-value-usd'> (${inPlay})</span>`)
      }
      updateSlips()
    })
    .catch(err => console.log('api err: ', err))
})()


var items =  []
async function loadItems() {
  await $.getJSON( "ress/items.json", function(data) {
   items = data
  })
}

async function search() {
  if (items) {
    let query = $('#search').val().toLowerCase()
    let result = items.filter(x =>{
      if (x.LocalizedNames && x.LocalizedNames[lang].toLowerCase().includes(query)) return x
    })

    let reponse = ''
    let end = result.length > 10 ? 10 : result.length
    for (var i = 0; i < end; i++) {
      img = await getImg(result[i].UniqueName);
      name = result[i].LocalizedNames[lang]
      reponse += `<div><a href="item\/${result[i].UniqueName}"><img width="64px" src="${img}"/>${stongIt(name, query)}</a></div>`
    }
    if (result.length > 10) reponse+= `<div>And ${result.length-10} more</div>`
    // let reponse = result.length < 10 ? result.map(x => `<a href="product\/${x.code}"><div>${x.name.en}</div></a>`).join('') : ''
    reponse = result.length == 0 ? '<div>No result</div>' : reponse
    $('#searchResult').html(query.length > 0 ? reponse : '')
  }
}

async function getImg(img){
  return new Promise(function(resolve, reject) {
    link=`https://albiononline2d.ams3.cdn.digitaloceanspaces.com/thumbnails/orig/${img.split("@")[0]}`;
    var tester=new Image()
    tester.onload=function() {resolve(link)}
    tester.onerror=function() {resolve("https://cdn.discordapp.com/attachments/185451991902846976/747196742851887265/unknown.png")}
    tester.src=link;
  });
}

function stongIt(string, toStrong) {
  toRegex = str => new RegExp(str, 'gmi')
  replacement = string.match(toRegex(toStrong))
  for (var i = 0; i < replacement.length; i++) {
    string = string.replace(replacement[i], `<b>${replacement[i]}</b>`)
  }
  return string
}

async function getPrices(item) {
  let info = []
  await $.ajax({
    url: `https://www.albion-online-data.com/api/v2/stats/prices/${item}`,
    method: 'GET',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        if (!info[data[i].city]) {
          info[data[i].city] = [];
        }
        info[data[i].city].push(data[i])
      }
    }
  });
  return info
}

async function loadPage(item){
  await loadItems()
  let ItemPrices = await getPrices(item);
  let ItemImg = await getImg(item);
  let ItemInfo = items.filter(x => x.UniqueName.startsWith(item))[0]
  console.log(ItemInfo);
  console.log(ItemPrices);
  $('#item-img').attr('src', ItemImg);
  $('#item-name').html(ItemInfo.LocalizedNames[lang])
  $('#item-desc').html(ItemInfo.LocalizedDescriptions[lang])
  let prices = []
  let a = 0
  for (var citie in ItemPrices) {
    txt = `
      <div id="${a}" class="item-prices-cities ${a}">
        <div onclick="showPrices('${a}')"><span class="item-prices-cities-name">${citie} <span id="${a}-a"><i class="fa fa-angle-down"></i></span></span> ${simplePrice(ItemPrices[citie][0].buy_price_max)}/${simplePrice(ItemPrices[citie][0].sell_price_min)} B/S (${simpleDate(ItemPrices[citie][0].buy_price_max_date)})</div>
        <div class="item-prices-cities-content">
          <table class="table">
            <thead>
              <tr>
                <th>Quality</th>
                <th>Buy Offer</th>
                <th>Sell Offer</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>`
      for (var i = 0; i < ItemPrices[citie].length; i++) {
        infoQua = ItemPrices[citie][i]
        txt+= `<tr><td>${infoQua.quality}</td><td>${infoQua.buy_price_max}<br><span class="last-u">Last Update ${infoQua.buy_price_max_date}</span></td><td>${infoQua.sell_price_min}<br><span class="last-u">Last Update ${infoQua.sell_price_min}</span></td><td>${infoQua.sell_price_min-infoQua.buy_price_max}</td></tr>`
      }
    txt+= '</tbody></table></div></div>'
    prices.push(txt)
    a++
  }
  $('#0-m').html(prices.join(''))
}

var showed = []
function showPrices(c) {
  console.log(c);
  if (showed.includes(c)) {
    index = showed.indexOf(c)
    showed.splice(index, 1)
    $('#'+c).css('height', '30px')
    $(`#${c}-a`).html('<i class="fa fa-angle-down"></i>')
  }else{
    showed.push(c)
    $(`#${c}-a`).html('<i class="fa fa-angle-up"></i>')
    $('#'+c).css('height', 'auto')
  }
}

async function loadDesc() {
  var langs = {}
  await $.getJSON( "ress/lang.json", function(data) {
   langs = data
  })
  $('#desc').html(`<p>${langs[lang].SiteDesc}</p>`)
}

function simpleDate(date) {
  date = new Date(date)
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

function simplePrice(price) {
  if (price > 1000000) return Number.parseFloat(price/1000000).toFixed(2)+'m'
  if (price > 1000) return Number.parseFloat(price/1000).toFixed(1)+'k'
  return price
}

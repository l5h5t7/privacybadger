require.scopes.multiDomainFP = (function() {

/**
 * 2d array of related domains (etld+1), all domains owned by the same entity go into
 * an array, this is later transformed for efficient lookups.
 */
var multiDomainFirstPartiesArray = [
  ["1800contacts.com", "800contacts.com"],
  ["37signals.com", "basecamp.com", "basecamphq.com", "highrisehq.com"],
  [
    "abcnews.com",
    "6abc.com",
    "abc7.com",
    "abc7ny.com",

    "go.com",

    "espn.com",
    "espncdn.com",

    "espn.com.au",
    "espn.com.br",
    "espn.co.uk",

    "espncricinfo.com",

    "espnfc.com",
    "espnfc.us",

    "fivethirtyeight.com",

    "disney.com",
    "disneymoviesanywhere.com",
    "dadt.com",
  ],
  ["accountonline.com", "citi.com", "citibank.com", "citicards.com", "citibankonline.com"],
  [
    "adobe.com",
    "adobeexchange.com",
    "adobe.io",
    "adobelogin.com",
    "behance.net",
    "mixamo.com",
    "myportfolio.com",
    "typekit.com",
  ],
  ["allstate.com", "myallstate.com"],
  ["altra.org", "altraonline.org"],
  [
    "amazon.com",

    "amazon.ca",
    "amazon.co.jp",
    "amazon.com.au",
    "amazon.com.mx",
    "amazon.co.uk",
    "amazon.de",
    "amazon.es",
    "amazon.fr",
    "amazon.in",
    "amazon.it",

    "audible.com",

    "audible.co.uk",
    "audible.de",

    "6pm.com",
    "imdb.com",
    "primevideo.com",
    "shopbop.com",
    "twitch.tv",
    "zappos.com",

    "media-amazon.com",
    "ssl-images-amazon.com",
  ],
  [
    "americanexpress.com",

    "americanexpress.ca",
    "americanexpress.ch",
    "americanexpress.com.au",
    "americanexpress.co.uk",
    "americanexpress.no",

    "membershiprewards.ca",
    "membershiprewards.com.ar",
    "membershiprewards.com.au",
    "membershiprewards.com.sg",
    "membershiprewards.co.uk",
    "membershiprewards.de",

    "aetclocator.com",
    "americanexpressfhr.com",
    "amexnetwork.com",
    "amextravel.com",
    "amextravelresources.com",
    "thecenturionlounge.com",
    "yourcarrentalclaim.com",

    "aexp-static.com",
  ],
  ["ameritrade.com", "tdameritrade.com"],
  ["ancestry.com", "mfcreative.com"],
  ["androidcentral.com", "mobilenations.com"],
  ["apple.com", "icloud.com"],
  ["applefcu.org", "applefcuonline.org"],
  ["archive.org", "openlibrary.org"],
  ["autodesk.com", "tinkercad.com"],
  ["avon.com", "youravon.com"],
  ["baidu.com", "bdimg.com", "bdstatic.com"],
  ["bananarepublic.com", "gap.com", "oldnavy.com", "piperlime.com"],
  ["bancomer.com", "bancomer.com.mx", "bbvanet.com.mx"],
  ["bankofamerica.com", "bofa.com", "mbna.com", "usecfo.com"],
  ["bank-yahav.co.il", "bankhapoalim.co.il"],
  ["belkin.com", "seedonk.com"],
  [
    "bitbucket.org",

    "atlassian.com",
    "atlassian.io",
    "atlassian.net",

    "customercase.com",
    "enso.me",
    "hipchat.com",
    "jira.com",
    "statuspage.io",
    "stride.com",
    "trello.com",
  ],
  ["bloomberg.com", "bbthat.com", "bwbx.io"],
  ["booking.com", "bstatic.com"],
  ["box.com", "boxcdn.net"],
  ["capitalone.com", "capitalone360.com"],
  ["century21.com", "21online.com"],
  ["chart.io", "chartio.com"],
  ["cnet.com", "cnettv.com", "com.com", "download.com", "news.com", "search.com", "upload.com"],
  ["concur.com", "concursolutions.com"],
  ["cox.com", "cox.net"],
  ["cricketwireless.com", "aiowireless.com"],
  ["dcu.org", "dcu-online.org"],
  ["diapers.com", "soap.com", "wag.com", "yoyo.com", "beautybar.com", "casa.com", "afterschool.com", "vine.com", "bookworm.com", "look.com", "vinemarket.com"],
  ["dictionary.com", "thesaurus.com", "sfdict.com"],
  ["discountbank.co.il", "telebank.co.il"],
  ["discover.com", "discovercard.com"],
  ["dropbox.com", "dropboxstatic.com", "getdropbox.com"],
  ["d.rip", "kickstarter.com"],
  ["ea.com", "origin.com", "play4free.com", "tiberiumalliance.com"],
  [
    "ebay.com",

    "ebay.at",
    "ebay.be",
    "ebay.ca",
    "ebay.ch",
    "ebay.com.au",
    "ebay.co.uk",
    "ebay.de",
    "ebay.fr",
    "ebay.ie",
    "ebay.in",
    "ebay.it",
    "ebay.nl",

    "ebaydesc.com",
    "ebayimg.com",
    "ebayrtm.com",
    "ebaystatic.com",
  ],
  ["express-scripts.com", "medcohealth.com"],
  ["facebook.com", "fbcdn.com", "fbcdn.net", "fbsbx.com", "facebook.net", "messenger.com"],
  ["firefox.com", "firefoxusercontent.com", "mozilla.org"],
  ["foxnews.com", "foxbusiness.com", "fncstatic.com"],
  [
    "gettyimages.com",

    "gettyimages.ca",
    "gettyimages.com.au",
    "gettyimages.co.uk",
    "gettyimages.dk",
    "gettyimages.fi",
    "gettyimages.nl",

    "istockphoto.com",

    "thinkstockphotos.com",
    "thinkstockphotos.ca",
  ],
  ["github.com", "githubapp.com"],
  ["gizmodo.com", "kinja-img.com", "kinja-static.com", "deadspin.com", "lifehacker.com",
    "technoratimedia.com", "kinja.com", "jalopnik.com", "jezebel.com"],
  [
    "glassdoor.com",

    "glassdoor.be",
    "glassdoor.ca",
    "glassdoor.co.in",
    "glassdoor.com.au",
    "glassdoor.co.uk",
    "glassdoor.de",
    "glassdoor.fr",
    "glassdoor.ie",
    "glassdoor.nl",
  ],
  ["gogoair.com", "gogoinflight.com"],
  [
    "google.com",
    "youtube.com",
    "gmail.com",
    "blogger.com",
    "blog.google",
    "googleblog.com",
    "chromium.org",

    "ggpht.com",
    "googleusercontent.com",
    "googlevideo.com",
    "gstatic.com",
    "youtube-nocookie.com",
    "ytimg.com",

    "google.ae",
    "google.at",
    "google.be",
    "google.bg",
    "google.by",
    "google.ca",
    "google.ch",
    "google.cl",
    "google.com.af",
    "google.com.ar",
    "google.com.au",
    "google.com.br",
    "google.com.co",
    "google.com.cy",
    "google.com.do",
    "google.com.ec",
    "google.com.eg",
    "google.com.hk",
    "google.com.mm",
    "google.com.mx",
    "google.com.ni",
    "google.com.np",
    "google.com.ph",
    "google.com.pk",
    "google.com.pr",
    "google.com.py",
    "google.com.sa",
    "google.com.sg",
    "google.com.sv",
    "google.com.tr",
    "google.com.tw",
    "google.com.ua",
    "google.com.uy",
    "google.com.vn",
    "google.co.ao",
    "google.co.cr",
    "google.co.id",
    "google.co.il",
    "google.co.in",
    "google.co.jp",
    "google.co.kr",
    "google.co.ma",
    "google.co.nz",
    "google.co.th",
    "google.co.uk",
    "google.co.ve",
    "google.co.za",
    "google.cz",
    "google.de",
    "google.dk",
    "google.dz",
    "google.ee",
    "google.es",
    "google.fi",
    "google.fr",
    "google.gr",
    "google.hr",
    "google.hu",
    "google.ie",
    "google.iq",
    "google.is",
    "google.it",
    "google.lt",
    "google.lu",
    "google.lv",
    "google.ml",
    "google.nl",
    "google.no",
    "google.pl",
    "google.pt",
    "google.ro",
    "google.rs",
    "google.ru",
    "google.se",
    "google.si",
    "google.sk",
    "google.tn",
    "google.tt",

    "fonts.googleapis.com",
    "storage.googleapis.com",
    "www.googleapis.com",
  ],
  ["gotomeeting.com", "citrixonline.com"],
  ["guardian.co.uk", "guim.co.uk", "guardianapps.co.uk", "theguardian.com", "gu-web.net"],
  [
    "habrahabr.ru",
    "freelansim.ru",
    "geektimes.ru",
    "moikrug.ru",
    "toster.ru",

    "habracdn.net",
    "habrastorage.org",
    "hsto.org",
  ],
  ["healthfusion.com", "healthfusionclaims.com"],
  ["hvfcu.org", "hvfcuonline.org"],
  ["logmein.com", "logme.in"],
  ["macys.com", "macysassets.com"],
  ["mandtbank.com", "mtb.com"],
  ["mathletics.com", "mathletics.com.au", "mathletics.co.uk"],
  ["mdsol.com", "imedidata.com"],
  ["meetup.com", "meetupstatic.com"],
  ["mercadolivre.com", "mercadolivre.com.br", "mercadolibre.com", "mercadolibre.com.ar", "mercadolibre.com.mx"],
  ["mi.com", "xiaomi.com"],
  [
    "microsoft.com",

    "aspnetcdn.com",
    "azureedge.net",
    "bing.com",
    "bing.net",
    "dynamics.com",
    "gfx.ms",
    "healthvault.com",
    "hotmail.com",
    "live.com",
    "microsoftonline.com",
    "microsoftstore.com",
    "msn.com",
    "msocdn.com",
    "office365.com",
    "office.com",
    "office.net",
    "onenote.com",
    "onestore.ms",
    "passport.net",
    "sharepoint.com",
    "skypeassets.com",
    "skype.com",
    "s-microsoft.com",
    "visualstudio.com",
    "windows.com",
    "xboxlive.com",
    "xbox.com",
    "yammer.com",
  ],
  ["mobilism.org.in", "mobilism.org"],
  ["morganstanley.com", "morganstanleyclientserv.com", "stockplanconnect.com", "ms.com"],
  ["msnbc.com", "nbcnews.com", "newsvine.com"],
  ["my-bookings.org", "my-bookings.cc"],
  ["mycanal.fr", "canal-plus.com"],
  ["mymerrill.com", "ml.com", "merrilledge.com"],
  ["mynortonaccount.com", "norton.com"],
  ["mysmartedu.com", "mysmartabc.com"],
  ["mysql.com", "oracle.com"],
  ["myuv.com", "uvvu.com"],
  ["nefcuonline.com", "nefcu.com"],
  ["netflix.com", "nflxext.com", "nflximg.net", "nflxvideo.net"],
  ["newegg.com", "neweggbusiness.com", "newegg.ca"],
  ["norsk-tipping.no", "buypass.no"],
  ["nymag.com", "vulture.com", "grubstreet.com"],
  ["nypublicradio.org", "radiolab.org", "wnyc.org", "wqxr.org", "thegreenespace.org"],
  ["nytimes.com", "newyorktimes.com", "nyt.com"],
  ["onlineatnsb.com", "norwaysavingsbank.com"],
  ["paypal.com", "paypal-search.com"],
  ["pcworld.com", "staticworld.net", "idg.com", "idg.net", "infoworld.com", "macworld.com", "techhive.com", "idg.tv"],
  ["pepco.com", "pepcoholdings.com"],
  ["philips.com", "philips.nl"],
  ["playstation.com", "sonyentertainmentnetwork.com"],
  ["pokemon-gl.com", "pokemon.com"],
  ["pornhub.com", "phncdn.com"],
  ["postepay.it", "poste.it"],
  [
    "qq.com",
    "dnspod.cn",
    "gtimg.cn",
    "gtimg.com",
    "qcloud.com",
    "tencent.com",
    "wechat.com",
    "wegame.com",
    "weiyun.com",
  ],
  ["railnation.ru", "railnation.de", "rail-nation.com", "railnation.gr", "railnation.us", "trucknation.de", "traviangames.com"],
  ["rakuten.com", "buy.com"],
  ["reddit.com", "redditmedia.com", "redditstatic.com", "redd.it", "redditenhancementsuite.com", "reddituploads.com", "imgur.com"],
  ["sanguosha.com", "bianfeng.com"],
  ["schwab.com", "schwabplan.com"],
  ["sears.com", "shld.net"],
  ["shopify.com", "myshopify.com"],
  ["siriusxm.com", "sirius.com"],
  ["skygo.co.nz", "skytv.co.nz"],
  ["skysports.com", "skybet.com", "skyvegas.com"],
  ["slickdeals.net", "slickdealscdn.com"],
  ["snapfish.com", "snapfish.ca"],
  ["sony.com", "sonyrewards.com"],
  ["soundcu.com", "netteller.com"],
  ["southerncompany.com", "southernco.com"],
  ["southparkstudios.com", "cc.com", "comedycentral.com"],
  ["sprint.com", "sprintpcs.com", "nextel.com"],
  ["steampowered.com", "steamstatic.com", "steamcommunity.com"],
  ["taobao.com", "alicdn.net", "tmail.com", "tbcdn.cn", "alibaba.com",
    "aliexpress.com", "tmall.com", "alimama.com", "1688.com", "aliyun.com", "www.net.cn"],
  ["techdata.com", "techdata.ch"],
  ["telekom.com", "t-online.de"],
  ["tesla.com", "teslamotors.com"],
  ["tripadvisor.com", "tacdn.com", "tamgrt.com"],
  ["trsretire.com", "divinvest.com"],
  ["turbotax.com", "intuit.com"],
  ["twitch.tv", "ttvnw.net", "jtvnw.net"],
  ["twitter.com", "twimg.com", "t.co"],
  ["ua2go.com", "ual.com", "united.com", "unitedwifi.com"],
  ["verizon.com", "verizon.net"],
  ["vk.com", "vk.me", "vkontakte.ru"],
  ["volkskrant.nl", "persgroep.net", "persgroep.nl", "parool.nl"],
  ["volvooceanrace.com", "virtualregatta.com"],
  ["walmart.com", "wal.co", "walmartimages.com", "walmart.ca"],
  ["weebly.com", "editmysite.com"],
  ["wellsfargo.com", "wf.com"],
  ["wikia.com", "wikia.net", "nocookie.net"],
  ["wikipedia.org", "wikimedia.org", "wikimediafoundation.org", "wiktionary.org",
    "wikiquote.org", "wikibooks.org", "wikisource.org", "wikinews.org",
    "wikiversity.org", "mediawiki.org", "wikidata.org", "wikivoyage.org"],
  ["wordpress.com", "wp.com"],
  ["wpcu.coop", "wpcuonline.com"],
  ["wsj.com", "wsj.net", "barrons.com", "dowjones.com", "marketwatch.com"],
  ["xda-developers.com", "xda-cdn.com"],
  ["xfinity.com", "comcast.net", "comcast.com"],
  ["xiami.com", "alipay.com"],
  ["yahoo.com", "yahooapis.com", "yimg.com", "yahoo.co.jp", "overture.com", "flickr.com"],
  ["yandex.ru", "yastatic.net", "yandex.net"],
  ["zendesk.com", "zopim.com"],
  ["zillow.com", "zillowstatic.com", "zillowcloud.com"],
  ["zoho.com", "zoho.eu", "zohocorp.com", "zohocreator.com", "zohopublic.com", "zohostatic.com"],
  ["zonealarm.com", "zonelabs.com"],
];

/**
 * Make a data structure for quick lookups of whether two domains are the same first party
 */
function makeDomainLookup(mdfpArray) {
  let out = {},
    arrLength = mdfpArray.length;
  for (let i = 0; i < arrLength; i++) {
    let inner = new Set(mdfpArray[i]);
    for (let domain of inner) {
      out[domain] = inner;
    }
  }
  return out;
}

function makeIsMultiDomainFirstParty(domainLookup) {
  return function (domain1, domain2) {
    if (domain1 in domainLookup) {
      return (domainLookup[domain1].has(domain2));
    }
    return false;
  };
}

let _domainLookup = makeDomainLookup(multiDomainFirstPartiesArray);
/**
 * Check if two domains belong to the same effective first party
 * @param {String} domain1 a base doamin
 * @param {String} domain2 a second base doamin
 *
 * @return boolean true if the domains are the same first party
 **/
let isMultiDomainFirstParty = makeIsMultiDomainFirstParty(_domainLookup);
/************************************** exports */
return {
  isMultiDomainFirstParty,
  makeDomainLookup,
  makeIsMultiDomainFirstParty,
  multiDomainFirstPartiesArray,
};
})(); //require scopes

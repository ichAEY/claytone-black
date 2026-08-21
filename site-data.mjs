// TANEM: all customer-specific content lives here.
// For a new master, copy the repository and edit this file + replace images in public/assets.

const yclientsBase = "https://n962951.yclients.com/company/894717/personal";
const serviceUrl = (id) => `${yclientsBase}/select-services?o=${id}`;

export default {
  brand: {
    name: "ClayTone",
    subtitle: "Nail studio",
    monogram: "C",
  },

  master: {
    name: "Нонна",
    dative: "Нонне",
    genitive: "Нонны",
    monogram: "N",
    profession: "мастер ногтевого сервиса",
    heroTitle: "Нонна — мастер ногтевого сервиса",
    heroCopy: "Маникюр, педикюр и наращивание с аккуратной обработкой, стерильными инструментами и вниманием к форме.",
    experienceYears: "8",
    experienceAria: "Восемь лет опыта",
    aboutTitle: "Нонна — мастер ClayTone",
    aboutLead: "Я Нонна — дипломированный мастер маникюра и педикюра.",
    aboutParagraphs: [
      "Более восьми лет я работаю с разной длиной и формой ногтей: выполняю аккуратный маникюр, педикюр, укрепление и наращивание.",
      "Перед процедурой мы обсуждаем желаемый результат, подбираем форму и покрытие. Инструменты проходят обязательную стерилизацию, а работа строится без спешки и лишних процедур.",
    ],
    skills: ["Маникюр и педикюр", "Наращивание и коррекция", "Стерильные инструменты"],
  },

  location: {
    city: "Москва",
    metro: "м. Спортивная",
    cityMetro: "Москва · м. Спортивная",
    address: "Москва, Кооперативная улица, 4, корп. 9",
    mapCardAddress: "Кооперативная улица, 4, корп. 9",
    schedule: "ежедневно 10:00–22:00",
    scheduleCapitalized: "Ежедневно 10:00–22:00",
    latitude: 55.724018,
    longitude: 37.567419,
  },

  contacts: {
    phoneDisplay: "+7 905 414-10-88",
    phoneHref: "tel:+79054141088",
    personalTelegramUrl: "https://t.me/nonnails",
    channelTelegramUrl: "https://t.me/nonnnails",
  },

  links: {
    bookingUrl: `${yclientsBase}/select-time`,
    bookingWidgetScriptUrl: "//w962951.yclients.com/widgetJS",
    reviewsUrl: "https://yandex.ru/maps/org/claytone/132613437697/reviews/?ll=37.567420%2C55.724018&tab=reviews&z=17.08",
    mapUrl: "https://yandex.ru/maps/org/claytone/132613437697/?ll=37.567419%2C55.724018&z=16",
    routeUrl: "https://yandex.ru/maps/?mode=routes&rtext=~55.724018%2C37.567419&rtt=auto",
    mobileMapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.567419%2C55.724018&mode=search&oid=132613437697&ol=biz&z=16",
    desktopMapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.567419%2C55.724018&z=16&l=map&pt=37.567419%2C55.724018%2Cpm2rdm",
    yandexMapHrefMatch: "yandex.ru/maps/org/claytone",
  },

  reputation: {
    rating: "5,0",
    reviewCount: "95",
  },

  images: {
    portrait: "/assets/nonna-portrait.jpeg",
    about: "/assets/nonna-about.webp",
    favicon: "/assets/favicon.png",
    beforeAfter: [
      { src: "/assets/before-after-recovery.webp", alt: "До и после — восстановление ногтей и аккуратный нюдовый маникюр" },
      { src: "/assets/before-after-natural.webp", alt: "До и после — натуральный маникюр и выравнивание формы" },
    ],
    // These are the photos the live Nonna site actually shows after its old runtime overrides.
    // Keeping the visible versions here lets us remove those hidden overrides without changing the site.
    gallery: [
      { src: "/assets/photo1.jpg", alt: "Работа ClayTone — новое фото 1" },
      { src: "/assets/photo2.jpg", alt: "Работа ClayTone — новое фото 2" },
      { src: "/assets/photo3.jpg", alt: "Работа ClayTone — новое фото 3" },
      { src: "/assets/photo4.jpg", alt: "Работа ClayTone — новое фото 4" },
      { src: "/assets/photo5.jpg", alt: "Работа ClayTone — новое фото 5" },
      { src: "/assets/work-06.webp", alt: "Работа Нонны — маникюр винного оттенка" },
      { src: "/assets/work-07.webp", alt: "Работа Нонны — графичный тёмный дизайн" },
      { src: "/assets/mobile-work-french.webp", alt: "Работа Нонны — чистый френч на мягком квадрате" },
      { src: "/assets/mobile-work-pearl.webp", alt: "Работа Нонны — жемчужное покрытие" },
      { src: "/assets/mobile-work-wine.webp", alt: "Работа Нонны — глубокий винный оттенок" },
      { src: "/assets/portfolio-french.webp", alt: "Работа Нонны — тонкий молочный френч" },
      { src: "/assets/portfolio-pearl.webp", alt: "Работа Нонны — перламутровый нюд" },
      { src: "/assets/photo6.jpg", alt: "Работа ClayTone — новое фото 6" },
    ],
  },

  services: {
    manicure: [
      { name: "Комбо — маникюр + педикюр", price: "6 800 ₽", time: "3 ч", description: "Две процедуры в одной записи. Экономия — 750 ₽.", url: serviceUrl("m5439528s26277760") },
      { name: "Наращивание ногтей", price: "5 500 ₽", time: "2 ч", description: "Снятие, маникюр, наращивание, покрытие гель-лаком и дизайн.", url: serviceUrl("m5439528s19345530") },
      { name: "Коррекция наращённых ногтей", price: "4 700 ₽", time: "2 ч", description: "Снятие, маникюр, укрепление гелем, донаращивание и покрытие.", url: serviceUrl("m5439528s19345536") },
      { name: "Комплекс S", price: "3 000 ₽", time: "1 ч 15 мин", description: "Маникюр и покрытие гель-лаком без снятия старого покрытия.", url: serviceUrl("m5439528s17329246") },
      { name: "Комплекс M", price: "3 500 ₽", time: "1 ч 30 мин", description: "Снятие, маникюр, покрытие, ремонт до двух ногтей и базовый дизайн.", url: serviceUrl("m5439528s17329251") },
      { name: "Комплекс L", price: "4 500 ₽", time: "2 ч", description: "Снятие, маникюр, укрепление гелем, покрытие и дизайн.", url: serviceUrl("m5439528s17329255") },
      { name: "Покрытие гель-лаком", price: "1 800 ₽", time: "45 мин", description: "Покрытие гель-лаком без маникюра.", url: serviceUrl("m5439528s13231053") },
      { name: "Маникюр комбинированный / аппаратный", price: "1 800 ₽", time: "1 ч", description: "Аппаратная или комбинированная обработка кутикулы и форма ногтей.", url: serviceUrl("m5439528s13230981") },
      { name: "Лак лечебный / цветной", price: "500 ₽", time: "15 мин", description: "Лечебное или цветное покрытие ногтей лаком.", url: serviceUrl("m5439528s20620785") },
      { name: "Японский маникюр", price: "2 300 ₽", time: "1 ч", description: "Форма, обработка кутикулы и японская полировка для естественного блеска.", url: serviceUrl("m5439528s16414211") },
      { name: "Дизайны", price: "100–500 ₽", time: "от 5 мин", description: "Кошачий глаз, втирка, градиент, френч или ручная роспись.", url: serviceUrl("m5439528s17350442") },
      { name: "Наращивание одного ногтя", price: "350 ₽", time: "20 мин", description: "Восстановление длины и формы одного ногтя.", url: serviceUrl("m5439528s13231069") },
      { name: "Ремонт ногтя", price: "200–350 ₽", time: "20 мин", description: "Восстановление целостности и формы одного ногтя.", url: serviceUrl("m5439528s17627677") },
      { name: "Холодный парафин для рук", price: "500 ₽", time: "15 мин", description: "Интенсивное увлажнение и питание кожи рук.", url: serviceUrl("m5439528s29517270") },
    ],
    pedicure: [
      { name: "Комплекс педикюр", price: "4 050 ₽", time: "1 ч 30 мин", description: "Снятие, форма, обработка кутикулы и стоп, покрытие гель-лаком.", url: serviceUrl("m5439528s13231092") },
      { name: "Пальцы ног + гель-лак", price: "3 500 ₽", time: "1 ч", description: "Форма, обработка кутикулы и покрытие. Стопы не обрабатываются.", url: serviceUrl("m5439528s13231104") },
      { name: "Стопы и ногти без покрытия", price: "3 000 ₽", time: "1 ч", description: "Полная обработка стоп и ногтей без покрытия гель-лаком.", url: serviceUrl("m5439528s13231102") },
      { name: "Обработка пальцев ног", price: "1 800 ₽", time: "1 ч", description: "Аппаратная или комбинированная обработка пальцев без обработки стоп.", url: serviceUrl("m5439528s13231109") },
      { name: "Полное снятие гель-лака", price: "700 ₽", time: "30 мин", description: "Полное снятие без маникюра, с коррекцией формы ногтей.", url: serviceUrl("m5439528s17350429") },
      { name: "Холодный парафин для ног", price: "700 ₽", time: "15 мин", description: "Глубокое увлажнение, смягчение сухих и огрубевших участков стоп.", url: serviceUrl("m5439528s29517282") },
    ],
  },

  reviews: [
    { text: "Ногти выглядят очень эстетично и аккуратно.", author: "in-melik" },
    { text: "Мастер Нонна работает очень уверенно.", author: "Вероника Оганезова" },
    { text: "Больше трёх недель без единой отслойки.", author: "Anush Ануш" },
    { text: "Никаких порезов или дискомфорта.", author: "Johnny Cage" },
  ],

  promotions: [
    {
      title: "−10% на первый визит",
      highlight: "Карта лояльности в подарок",
      description: "Скидка действует уже на первом посещении. С картой лояльности пятое посещение — −5%, десятое — −10%.",
      period: "до 31 августа 2026",
      image: "/assets/photohh1.jpg",
      alt: "Первая акция ClayTone",
    },
    {
      title: "Комбо: маникюр + педикюр",
      highlight: "Экономия 550 ₽",
      description: "Маникюр и педикюр с покрытием в одной записи. Экономия 550 ₽, продолжительность — от двух до трёх часов.",
      period: "до 31 декабря 2026",
      image: "/assets/photohh2.jpg",
      alt: "Вторая акция ClayTone",
    },
  ],

  amenities: [
    { title: "Наращивание", text: "Наращивание и коррекция ногтей" },
    { title: "Wi‑Fi", text: "Доступен во время процедуры" },
    { title: "Парковка рядом", text: "Можно приехать на автомобиле" },
  ],

  seo: {
    title: "Нонна | ClayTone Nail Studio",
    description: "Маникюр и педикюр в Москве — ClayTone Nail Studio.",
    keywords: ["маникюр Спортивная", "педикюр Спортивная", "мастер маникюра Москва", "ClayTone", "Нонна маникюр"],
    locale: "ru_RU",
  },

  analytics: {
    yandexMetrikaId: "111558185",
  },
};

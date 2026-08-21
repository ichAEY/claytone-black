"use client";

import { useEffect, useRef, useState } from "react";
import { openYclientsWidget } from "./yclients-widget";

const bookingUrl =
  "https://n962951.yclients.com/company/894717/personal/select-time";

const works = Array.from({ length: 7 }, (_, index) => ({
  src: `/assets/work-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Маникюр Нонны — работа ${index + 1}`,
}));

const beforeAfterWorks = [
  {
    src: "/assets/before-after-nude.webp",
    alt: "До и после: натуральные ногти и молочно-нюдовый маникюр",
  },
  {
    src: "/assets/before-after-wine.webp",
    alt: "До и после: натуральные ногти и вишнёвый маникюр",
  },
  {
    src: "/assets/before-after-french.webp",
    alt: "До и после: натуральные ногти и тонкий микрофренч",
  },
];

const generatedWorks = [
  { src: "/assets/portfolio-pearl.webp", alt: "Молочно-розовый маникюр с жемчужным блеском" },
  { src: "/assets/portfolio-wine.webp", alt: "Вишнёвый маникюр на мягком квадрате" },
  { src: "/assets/portfolio-french.webp", alt: "Молочный маникюр с тонким микрофренчем" },
];

const mobileWorks = [...generatedWorks, ...works.slice(0, 3)];
const galleryWorks = [...beforeAfterWorks, ...generatedWorks, ...works];

type Service = {
  id: string;
  category: "manicure" | "pedicure";
  name: string;
  price: string;
  duration: string;
  description: string;
  url: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "combo",
    category: "manicure",
    name: "Маникюр + педикюр с покрытием",
    price: "6 800 ₽",
    duration: "2–3 ч",
    description: "Две процедуры в одной записи. Экономия — 750 ₽.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s26277760",
    featured: true,
  },
  {
    id: "extension",
    category: "manicure",
    name: "Наращивание ногтей",
    price: "5 500 ₽",
    duration: "2 ч",
    description: "Снятие, маникюр, наращивание, покрытие гель-лаком и дизайн.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s19345530",
    featured: true,
  },
  {
    id: "extension-correction",
    category: "manicure",
    name: "Коррекция наращённых ногтей",
    price: "4 700 ₽",
    duration: "2 ч",
    description: "Снятие, маникюр, укрепление гелем, донаращивание и покрытие.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s19345536",
  },
  {
    id: "complex-s",
    category: "manicure",
    name: "Комплекс S",
    price: "3 000 ₽",
    duration: "1 ч 15 мин",
    description: "Маникюр и покрытие гель-лаком без снятия старого покрытия.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s17329246",
    featured: true,
  },
  {
    id: "complex-m",
    category: "manicure",
    name: "Комплекс M",
    price: "3 500 ₽",
    duration: "1 ч 30 мин",
    description: "Снятие, маникюр, покрытие, ремонт до двух ногтей и базовый дизайн.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s17329251",
    featured: true,
  },
  {
    id: "complex-l",
    category: "manicure",
    name: "Комплекс L",
    price: "4 500 ₽",
    duration: "2 ч",
    description: "Снятие, маникюр, укрепление гелем, покрытие и дизайн.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s17329255",
    featured: true,
  },
  {
    id: "gel-only",
    category: "manicure",
    name: "Покрытие гель-лаком",
    price: "1 800 ₽",
    duration: "45 мин",
    description: "Покрытие гель-лаком без маникюра.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13231053",
  },
  {
    id: "manicure-clean",
    category: "manicure",
    name: "Маникюр без покрытия",
    price: "1 800 ₽",
    duration: "1 ч",
    description: "Аппаратная или комбинированная обработка кутикулы и форма ногтей.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13230981",
    featured: true,
  },
  {
    id: "nail-polish",
    category: "manicure",
    name: "Лак лечебный / цветной",
    price: "500 ₽",
    duration: "15 мин",
    description: "Лечебное или цветное покрытие ногтей лаком.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s20620785",
  },
  {
    id: "japanese",
    category: "manicure",
    name: "Японский маникюр",
    price: "2 300 ₽",
    duration: "1 ч",
    description: "Форма, обработка кутикулы и японская полировка для естественного блеска.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s16414211",
  },
  {
    id: "design",
    category: "manicure",
    name: "Дизайны",
    price: "100–500 ₽",
    duration: "от 5 мин",
    description: "Кошачий глаз, втирка, градиент, френч или ручная роспись.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s17350442",
  },
  {
    id: "single-extension",
    category: "manicure",
    name: "Наращивание одного ногтя",
    price: "350 ₽",
    duration: "20 мин",
    description: "Восстановление длины и формы одного ногтя.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13231069",
  },
  {
    id: "repair",
    category: "manicure",
    name: "Ремонт ногтя",
    price: "200–350 ₽",
    duration: "20 мин",
    description: "Восстановление целостности и формы одного ногтя.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s17627677",
  },
  {
    id: "hand-paraffin",
    category: "manicure",
    name: "Холодный парафин для рук",
    price: "500 ₽",
    duration: "15 мин",
    description: "Интенсивное увлажнение и питание кожи рук.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s29517270",
  },
  {
    id: "pedicure-full",
    category: "pedicure",
    name: "Комплекс педикюр",
    price: "4 050 ₽",
    duration: "1 ч 30 мин",
    description: "Снятие, форма, обработка кутикулы и стоп, покрытие гель-лаком.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13231092",
    featured: true,
  },
  {
    id: "toes-gel",
    category: "pedicure",
    name: "Пальцы ног + гель-лак",
    price: "3 500 ₽",
    duration: "1 ч",
    description: "Форма, обработка кутикулы и покрытие. Стопы не обрабатываются.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13231104",
    featured: true,
  },
  {
    id: "feet-no-gel",
    category: "pedicure",
    name: "Стопы и ногти без покрытия",
    price: "3 000 ₽",
    duration: "1 ч",
    description: "Полная обработка стоп и ногтей без покрытия гель-лаком.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13231102",
    featured: true,
  },
  {
    id: "toes-only",
    category: "pedicure",
    name: "Обработка пальцев ног",
    price: "1 800 ₽",
    duration: "1 ч",
    description: "Аппаратная или комбинированная обработка пальцев без обработки стоп.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s13231109",
    featured: true,
  },
  {
    id: "gel-removal",
    category: "pedicure",
    name: "Полное снятие гель-лака",
    price: "700 ₽",
    duration: "30 мин",
    description: "Полное снятие без маникюра, с коррекцией формы ногтей.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s17350429",
  },
  {
    id: "feet-paraffin",
    category: "pedicure",
    name: "Холодный парафин для ног",
    price: "700 ₽",
    duration: "15 мин",
    description: "Глубокое увлажнение, смягчение сухих и огрубевших участков стоп.",
    url: "https://n962951.yclients.com/company/894717/personal/select-services?o=m5439528s29517282",
  },
];

const reviews = [
  {
    text: "Очень внимательный мастер. Ногти выглядят эстетично и аккуратно, а в кабинете чисто и уютно.",
    author: "in-melik",
  },
  {
    text: "Покрытие носилось больше трёх недель без единой отслойки. Нонна — настоящий профессионал.",
    author: "Anush Ануш",
  },
  {
    text: "Маникюр и педикюр выполнены очень аккуратно и чисто. Чувствуется работа профессионального мастера.",
    author: "Наталья Е.",
  },
];

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "ClayTone",
  description: "Камерное пространство мастера маникюра и педикюра Нонны.",
  telephone: "+7-905-414-10-88",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Кооперативная улица, 4, корпус 9",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  openingHours: "Mo-Su 10:00-22:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", ratingCount: "95" },
  priceRange: "₽₽",
};

export default function DesktopClayTone() {
  const worksRef = useRef<HTMLElement | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [serviceTab, setServiceTab] = useState<"manicure" | "pedicure">("manicure");
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [fullPriceOpen, setFullPriceOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [comparisonPaused, setComparisonPaused] = useState(false);
  const [stickyBookingVisible, setStickyBookingVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const locked = galleryOpen || activeImage !== null || fullPriceOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [galleryOpen, activeImage, fullPriceOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
        setGalleryOpen(false);
        setFullPriceOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const updateStickyBooking = () => {
      const portfolioTop = worksRef.current?.offsetTop ?? Number.POSITIVE_INFINITY;
      const isMobile = window.matchMedia("(max-width: 700px)").matches;
      setMobileView(isMobile);
      setStickyBookingVisible(
        isMobile && window.scrollY + window.innerHeight * 0.22 >= portfolioTop,
      );
    };
    updateStickyBooking();
    window.addEventListener("scroll", updateStickyBooking, { passive: true });
    window.addEventListener("resize", updateStickyBooking);
    return () => {
      window.removeEventListener("scroll", updateStickyBooking);
      window.removeEventListener("resize", updateStickyBooking);
    };
  }, []);

  const visibleServices = services.filter(
    (service) => service.category === serviceTab && service.featured,
  );
  const activeGalleryWorks = mobileView ? galleryWorks : works;
  const activeWork =
    activeImage === null
      ? null
      : activeGalleryWorks[activeImage % activeGalleryWorks.length];

  const renderService = (service: Service, index: number, className = "") => {
    const isOpen = expandedService === service.id;
    return (
      <article className={`service-row ${isOpen ? "is-open" : ""} ${className}`} key={service.id}>
        <button
          className="service-summary"
          onClick={() => setExpandedService(isOpen ? null : service.id)}
          aria-expanded={isOpen}
        >
          <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
          <strong>{service.name}</strong>
          <span className="service-time">{service.duration}</span>
          <b>{service.price}</b>
          <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
        </button>
        {isOpen && (
          <div className="service-detail">
            <p>{service.description}</p>
            <a
              href="#"
              aria-haspopup="dialog"
              onClick={(event) => openYclientsWidget(event, service.url)}
            >
              Записаться на услугу <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </article>
    );
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ClayTone — на главную">
          ClayTone
          <span>nail atelier</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#works">Работы</a>
          <a href="#prices">Цены</a>
          <a href="#booking">Запись</a>
        </nav>
        <a className="header-book" href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)}>
          Записаться <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Москва · м. Спортивная</p>
          <h1 id="hero-title">
            <span className="desktop-hero-title">Маникюр,<em>который подходит вам</em></span>
            <span className="mobile-hero-title">Маникюр<br/>и педикюр<em>у мастера Нонны</em></span>
          </h1>
          <p className="hero-lead">
            Аккуратная работа, стерильные инструменты и спокойная атмосфера —
            без спешки и компромиссов.
          </p>
          <p className="hero-detail">
            ClayTone — камерное пространство одного мастера, где всё внимание
            сосредоточено на клиенте. Форма, длина и оттенок подбираются с
            учётом ваших пожеланий и образа жизни. Здесь важны эстетичный
            результат, комфорт во время процедуры и покрытие, которое удобно
            носить каждый день.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)}>
              Выбрать время <span aria-hidden="true">↗</span>
            </a>
            <a className="quiet-link" href="#works">Смотреть работы <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof" aria-label="Преимущества">
            <div><strong>8 лет</strong><span>опыта</span></div>
            <div><strong>5,0</strong><span>рейтинг</span></div>
            <div><strong>95</strong><span>оценок</span></div>
          </div>
        </div>

        <div className="hero-collage" aria-label="Нонна и её работа">
          <figure className="hero-portrait">
            <img src="/assets/nonna-portrait.jpeg" alt="Нонна — мастер ClayTone" />
          </figure>
          <figure className="hero-work">
            <img src="/assets/work-07.webp" alt="Дизайн ногтей, выполненный Нонной" />
          </figure>
          <div className="hero-seal" aria-hidden="true">
            <span>ONE MASTER</span><b>CT</b><span>ONE CLIENT</span>
          </div>
        </div>
      </section>

      <div className="promise-strip" aria-label="Принципы ClayTone">
        <span>Стерильность</span><i>✦</i><span>Точность</span><i>✦</i>
        <span>Комфорт</span><i>✦</i><span>Стойкое покрытие</span>
      </div>

      <section className="works" id="works" ref={worksRef} aria-labelledby="works-title">
        <div className="section-heading">
          <p className="eyebrow"><span /> Портфолио</p>
          <h2 id="works-title">
            <span className="desktop-works-title">Работы без <em>лишних слов</em></span>
            <span className="mobile-works-title">До и после.<em>Реальные работы.</em></span>
          </h2>
          <p>Реальные фотографии работ Нонны. Нажмите, чтобы рассмотреть детали.</p>
        </div>

        <div
          className={`before-after-window ${comparisonPaused ? "is-paused" : ""}`}
          onPointerDown={() => setComparisonPaused(true)}
          onPointerUp={() => setComparisonPaused(false)}
          onPointerCancel={() => setComparisonPaused(false)}
          onPointerLeave={() => setComparisonPaused(false)}
          aria-label="Примеры работ до и после. Удерживайте, чтобы остановить ленту"
        >
          <div className="before-after-track">
            {[0, 1].map((group) => (
              <div className="before-after-group" key={group} aria-hidden={group === 1}>
                {beforeAfterWorks.map((work, index) => (
                  <button
                    className="before-after-card"
                    key={`${group}-${work.src}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Открыть пример до и после ${index + 1}`}
                    tabIndex={group === 1 ? -1 : 0}
                  >
                    <img src={work.src} alt={group === 0 ? work.alt : ""} />
                    <span className="before-label">До</span>
                    <span className="after-label">После</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="pause-hint">Удерживайте фото, чтобы остановить</p>
        </div>

        <div className="work-grid desktop-work-grid">
          {works.slice(0, 5).map((work, index) => (
            <button
              className={`work-tile work-tile-${index + 1}`}
              key={work.src}
              onClick={() => setActiveImage(index)}
              aria-label={`Увеличить фотографию работы ${index + 1}`}
            >
              <img src={work.src} alt={work.alt} loading={index > 1 ? "lazy" : undefined} />
              <span>0{index + 1}</span>
            </button>
          ))}
        </div>

        <div className="mobile-work-grid">
          {mobileWorks.slice(0, 4).map((work, index) => (
            <button
              className="mobile-work-tile"
              key={work.src}
              onClick={() => setActiveImage(beforeAfterWorks.length + index)}
              aria-label={`Увеличить фотографию работы ${index + 1}`}
            >
              <img src={work.src} alt={work.alt} loading={index > 1 ? "lazy" : undefined} />
            </button>
          ))}
        </div>

        <div className="works-action">
          <button className="round-link" onClick={() => setGalleryOpen(true)}>
            <span className="desktop-gallery-label">Смотреть все работы</span>
            <span className="mobile-gallery-label">Открыть галерею</span>
            <b aria-hidden="true">↗</b>
          </button>
        </div>
      </section>

      <section className="prices" id="prices" aria-labelledby="prices-title">
        <div className="prices-intro">
          <p className="eyebrow eyebrow-light"><span /> Услуги и цены</p>
          <h2 id="prices-title">Всё главное —<br/><em>сразу понятно.</em></h2>
          <p>Цена и длительность видны до записи. Нажмите на услугу, чтобы посмотреть состав.</p>
          <div className="price-note"><b>0 ₽</b><span>предоплата<br/>не требуется</span></div>
        </div>
        <div className="prices-list">
          <div className="service-tabs" role="tablist" aria-label="Категории услуг">
            <button
              role="tab"
              aria-selected={serviceTab === "manicure"}
              className={serviceTab === "manicure" ? "active" : ""}
              onClick={() => { setServiceTab("manicure"); setExpandedService(null); setMobileServicesOpen(false); }}
            >Маникюр</button>
            <button
              role="tab"
              aria-selected={serviceTab === "pedicure"}
              className={serviceTab === "pedicure" ? "active" : ""}
              onClick={() => { setServiceTab("pedicure"); setExpandedService(null); setMobileServicesOpen(false); }}
            >Педикюр</button>
          </div>
          <div className="featured-services desktop-featured-services">
            {visibleServices.map((service, index) => renderService(service, index))}
          </div>
          <div className="featured-services mobile-featured-services">
            {services.filter((service) => service.category === serviceTab).map((service, index) =>
              renderService(
                service,
                index,
                serviceTab === "manicure" && index > 4 && !mobileServicesOpen
                  ? "mobile-collapsed-service"
                  : "",
              ),
            )}
          </div>
          {serviceTab === "manicure" && (
            <button
              className="mobile-services-toggle"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
            >
              <span>{mobileServicesOpen ? "Свернуть меню" : "Показать все услуги"}</span>
              <i aria-hidden="true">{mobileServicesOpen ? "↑" : "↓"}</i>
            </button>
          )}
          <button className="full-price-button" onClick={() => setFullPriceOpen(true)}>
            Открыть полный прайс <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section className="booking" id="booking" aria-labelledby="booking-title">
        <div className="booking-main">
          <p className="eyebrow"><span /> Онлайн-запись</p>
          <h2 id="booking-title">Найдите своё<br/><em>свободное время</em></h2>
          <p>Выберите услугу и удобное окно в календаре YCLIENTS. Запись занимает пару минут.</p>
          <a className="button button-light" href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)}>
            Открыть календарь <span aria-hidden="true">↗</span>
          </a>
          <a className="telegram-link" href="https://t.me/nonnails" target="_blank" rel="noreferrer">
            Или написать Нонне в Telegram <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="master-card">
          <img src="/assets/nonna-about.webp" alt="Нонна, мастер маникюра и педикюра" loading="lazy" />
          <div className="master-copy">
            <p>О мастере</p>
            <h3>Нонна.<br/>8 лет практики.</h3>
            <p>«Мне важно, чтобы вам было спокойно на каждом этапе — от выбора формы до финального покрытия».</p>
            <ul>
              <li>Дипломированный мастер</li>
              <li>Стерильные инструменты</li>
              <li>Один клиент в одно время</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="reviews" aria-labelledby="reviews-title">
        <div className="reviews-title">
          <p className="eyebrow"><span /> Отзывы клиентов</p>
          <h2 id="reviews-title"><em>5,0</em> из 5</h2>
          <a href="https://yandex.ru/maps/org/claytone/132613437697/reviews/?tab=reviews" target="_blank" rel="noreferrer">
            Все 95 оценок на Яндекс Картах <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="review-cards">
          {reviews.map((review) => (
            <article key={review.author}>
              <span aria-label="5 звёзд">★★★★★</span>
              <blockquote>«{review.text}»</blockquote>
              <p>{review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="location" aria-labelledby="location-title">
        <div className="location-mark" aria-hidden="true"><span>CT</span></div>
        <div className="location-copy">
          <p className="eyebrow"><span /> Адрес</p>
          <h2 id="location-title">Москва,<br/><em>м. Спортивная</em></h2>
          <p>Кооперативная улица, 4, корпус 9</p>
          <a href="https://yandex.ru/maps/org/claytone/132613437697/" target="_blank" rel="noreferrer">
            Открыть карточку и маршрут <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="location-details">
          <div><span>Часы работы</span><strong>Пн–Вс<br/>10:00–22:00</strong></div>
          <div><span>Телефон</span><a href="tel:+79054141088">8 905 414-10-88</a></div>
          <div><span>Связаться</span><a href="https://t.me/nonnails" target="_blank" rel="noreferrer">Telegram ↗</a></div>
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#top">ClayTone <span>nail atelier</span></a>
        <p>Маникюр и педикюр Нонны · Москва</p>
        <a href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)}>Записаться онлайн ↗</a>
      </footer>

      {galleryOpen && (
        <div className="gallery-layer" role="dialog" aria-modal="true" aria-label="Все работы Нонны">
          <div className="gallery-head">
            <div><span>ClayTone</span><p>Все работы</p></div>
            <button onClick={() => setGalleryOpen(false)} aria-label="Закрыть галерею">Закрыть ×</button>
          </div>
          <div className="gallery-grid">
            {activeGalleryWorks.map((work, index) => (
              <button key={work.src} onClick={() => setActiveImage(index)} aria-label={`Увеличить работу ${index + 1}`}>
                <img src={work.src} alt={work.alt} />
              </button>
            ))}
          </div>
        </div>
      )}

      {fullPriceOpen && (
        <div className="price-layer" role="dialog" aria-modal="true" aria-label="Полный прайс ClayTone">
          <div className="gallery-head price-layer-head">
            <div><span>ClayTone</span><p>Полный прайс</p></div>
            <button onClick={() => setFullPriceOpen(false)} aria-label="Закрыть полный прайс">Закрыть ×</button>
          </div>
          <div className="price-layer-layout">
            <div className="price-layer-title">
              <p className="eyebrow"><span /> Все услуги</p>
              <h2>Выберите<br/><em>свою процедуру.</em></h2>
            </div>
            <div className="price-layer-list">
              <div className="service-tabs service-tabs-light" role="tablist" aria-label="Категории полного прайса">
                <button
                  role="tab"
                  aria-selected={serviceTab === "manicure"}
                  className={serviceTab === "manicure" ? "active" : ""}
                  onClick={() => { setServiceTab("manicure"); setExpandedService(null); setMobileServicesOpen(false); }}
                >Маникюр</button>
                <button
                  role="tab"
                  aria-selected={serviceTab === "pedicure"}
                  className={serviceTab === "pedicure" ? "active" : ""}
                  onClick={() => { setServiceTab("pedicure"); setExpandedService(null); setMobileServicesOpen(false); }}
                >Педикюр</button>
              </div>
              {services
                .filter((service) => service.category === serviceTab)
                .map((service, index) => renderService(service, index))}
            </div>
          </div>
        </div>
      )}

      {activeImage !== null && activeWork && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Увеличенная фотография">
          <button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Закрыть">×</button>
          <button
            className="lightbox-arrow lightbox-prev"
            onClick={() => setActiveImage((activeImage - 1 + activeGalleryWorks.length) % activeGalleryWorks.length)}
            aria-label="Предыдущая работа"
          >←</button>
          <img src={activeWork.src} alt={activeWork.alt} />
          <button
            className="lightbox-arrow lightbox-next"
            onClick={() => setActiveImage((activeImage + 1) % activeGalleryWorks.length)}
            aria-label="Следующая работа"
          >→</button>
        </div>
      )}

      <a
        className={`mobile-sticky-book ${
          stickyBookingVisible && !galleryOpen && activeImage === null && !fullPriceOpen
            ? "is-visible"
            : ""
        }`}
        href="#"
        aria-haspopup="dialog"
        onClick={(event) => openYclientsWidget(event, bookingUrl)}
      >
        <span><small>Онлайн-запись</small>Выбрать время</span>
        <b aria-hidden="true">↗</b>
      </a>
    </main>
  );
}

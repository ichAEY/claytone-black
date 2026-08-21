"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, TouchEvent as ReactTouchEvent } from "react";

type Service = { name: string; price: string; time: string; description: string; url: string };

const bookingUrl = "https://n962951.yclients.com/company/894717/personal/select-time";
const reviewsUrl = "https://yandex.ru/maps/org/claytone/132613437697/reviews/?ll=37.567420%2C55.724018&tab=reviews&z=17.08";
const mapUrl = "https://yandex.ru/maps/org/claytone/132613437697/?ll=37.567419%2C55.724018&z=16";
const routeUrl = "https://yandex.ru/maps/?mode=routes&rtext=~55.724018%2C37.567419&rtt=auto";
const mobileMapEmbedUrl = "https://yandex.ru/map-widget/v1/?ll=37.567419%2C55.724018&mode=search&oid=132613437697&ol=biz&z=16";
const desktopMapEmbedUrl = "https://yandex.ru/map-widget/v1/?ll=37.567419%2C55.724018&z=16&l=map&pt=37.567419%2C55.724018%2Cpm2rdm";
const personalTelegramUrl = "https://t.me/nonnails";
const channelTelegramUrl = "https://t.me/nonnnails";
const yclients = (service: string) =>
  `https://n962951.yclients.com/company/894717/personal/select-services?o=${service}`;

const manicure: Service[] = [
  { name: "Комбо — маникюр + педикюр", price: "6 800 ₽", time: "3 ч", description: "Две процедуры в одной записи. Экономия — 750 ₽.", url: yclients("m5439528s26277760") },
  { name: "Наращивание ногтей", price: "5 500 ₽", time: "2 ч", description: "Снятие, маникюр, наращивание, покрытие гель-лаком и дизайн.", url: yclients("m5439528s19345530") },
  { name: "Коррекция наращённых ногтей", price: "4 700 ₽", time: "2 ч", description: "Снятие, маникюр, укрепление гелем, донаращивание и покрытие.", url: yclients("m5439528s19345536") },
  { name: "Комплекс S", price: "3 000 ₽", time: "1 ч 15 мин", description: "Маникюр и покрытие гель-лаком без снятия старого покрытия.", url: yclients("m5439528s17329246") },
  { name: "Комплекс M", price: "3 500 ₽", time: "1 ч 30 мин", description: "Снятие, маникюр, покрытие, ремонт до двух ногтей и базовый дизайн.", url: yclients("m5439528s17329251") },
  { name: "Комплекс L", price: "4 500 ₽", time: "2 ч", description: "Снятие, маникюр, укрепление гелем, покрытие и дизайн.", url: yclients("m5439528s17329255") },
  { name: "Покрытие гель-лаком", price: "1 800 ₽", time: "45 мин", description: "Покрытие гель-лаком без маникюра.", url: yclients("m5439528s13231053") },
  { name: "Маникюр комбинированный / аппаратный", price: "1 800 ₽", time: "1 ч", description: "Аппаратная или комбинированная обработка кутикулы и форма ногтей.", url: yclients("m5439528s13230981") },
  { name: "Лак лечебный / цветной", price: "500 ₽", time: "15 мин", description: "Лечебное или цветное покрытие ногтей лаком.", url: yclients("m5439528s20620785") },
  { name: "Японский маникюр", price: "2 300 ₽", time: "1 ч", description: "Форма, обработка кутикулы и японская полировка для естественного блеска.", url: yclients("m5439528s16414211") },
  { name: "Дизайны", price: "100–500 ₽", time: "от 5 мин", description: "Кошачий глаз, втирка, градиент, френч или ручная роспись.", url: yclients("m5439528s17350442") },
  { name: "Наращивание одного ногтя", price: "350 ₽", time: "20 мин", description: "Восстановление длины и формы одного ногтя.", url: yclients("m5439528s13231069") },
  { name: "Ремонт ногтя", price: "200–350 ₽", time: "20 мин", description: "Восстановление целостности и формы одного ногтя.", url: yclients("m5439528s17627677") },
  { name: "Холодный парафин для рук", price: "500 ₽", time: "15 мин", description: "Интенсивное увлажнение и питание кожи рук.", url: yclients("m5439528s29517270") },
];

const pedicure: Service[] = [
  { name: "Комплекс педикюр", price: "4 050 ₽", time: "1 ч 30 мин", description: "Снятие, форма, обработка кутикулы и стоп, покрытие гель-лаком.", url: yclients("m5439528s13231092") },
  { name: "Пальцы ног + гель-лак", price: "3 500 ₽", time: "1 ч", description: "Форма, обработка кутикулы и покрытие. Стопы не обрабатываются.", url: yclients("m5439528s13231104") },
  { name: "Стопы и ногти без покрытия", price: "3 000 ₽", time: "1 ч", description: "Полная обработка стоп и ногтей без покрытия гель-лаком.", url: yclients("m5439528s13231102") },
  { name: "Обработка пальцев ног", price: "1 800 ₽", time: "1 ч", description: "Аппаратная или комбинированная обработка пальцев без обработки стоп.", url: yclients("m5439528s13231109") },
  { name: "Полное снятие гель-лака", price: "700 ₽", time: "30 мин", description: "Полное снятие без маникюра, с коррекцией формы ногтей.", url: yclients("m5439528s17350429") },
  { name: "Холодный парафин для ног", price: "700 ₽", time: "15 мин", description: "Глубокое увлажнение, смягчение сухих и огрубевших участков стоп.", url: yclients("m5439528s29517282") },
];

const beforeAfter = [
  { src: "/assets/before-after-recovery.webp", alt: "До и после — восстановление ногтей и аккуратный нюдовый маникюр" },
  { src: "/assets/before-after-natural.webp", alt: "До и после — натуральный маникюр и выравнивание формы" },
];

const galleryWorks = [
  { src: "/assets/work-01.webp", alt: "Работа Нонны — нежный маникюр с тонким френчем" },
  { src: "/assets/work-02.webp", alt: "Работа Нонны — аккуратный нюдовый маникюр" },
  { src: "/assets/work-03.webp", alt: "Работа Нонны — розовый маникюр мягкой формы" },
  { src: "/assets/work-04.webp", alt: "Работа Нонны — молочный френч" },
  { src: "/assets/work-05.webp", alt: "Работа Нонны — натуральный розовый маникюр" },
  { src: "/assets/work-06.webp", alt: "Работа Нонны — маникюр винного оттенка" },
  { src: "/assets/work-07.webp", alt: "Работа Нонны — графичный тёмный дизайн" },
  { src: "/assets/mobile-work-french.webp", alt: "Работа Нонны — чистый френч на мягком квадрате" },
  { src: "/assets/mobile-work-pearl.webp", alt: "Работа Нонны — жемчужное покрытие" },
  { src: "/assets/mobile-work-wine.webp", alt: "Работа Нонны — глубокий винный оттенок" },
  { src: "/assets/portfolio-french.webp", alt: "Работа Нонны — тонкий молочный френч" },
  { src: "/assets/portfolio-pearl.webp", alt: "Работа Нонны — перламутровый нюд" },
  { src: "/assets/portfolio-wine.webp", alt: "Работа Нонны — вишнёвый маникюр" },
];

const desktopGalleryModules = [galleryWorks.slice(0, 4), galleryWorks.slice(4, 8), galleryWorks.slice(8)];
const desktopGallerySetCount = 3;

const featuredWorks = galleryWorks.slice(0, 3);
const lightboxItems = [...beforeAfter, ...galleryWorks];

const reviews = [
  { text: "Ногти выглядят очень эстетично и аккуратно.", author: "in-melik" },
  { text: "Мастер Нонна работает очень уверенно.", author: "Вероника Оганезова" },
  { text: "Больше трёх недель без единой отслойки.", author: "Anush Ануш" },
  { text: "Никаких порезов или дискомфорта.", author: "Johnny Cage" },
];

const reviewSetCount = 5;

const promotions = [
  {
    title: "−10% на первый визит",
    highlight: "Карта лояльности в подарок",
    description: "Скидка действует уже на первом посещении. С картой лояльности пятое посещение — −5%, десятое — −10%.",
    period: "до 31 августа 2026",
    image: "/assets/promotion-first-visit-original.jpg",
    alt: "Оригинальные карты лояльности ClayTone — подарок при первом посещении",
  },
  {
    title: "Комбо: маникюр + педикюр",
    highlight: "Экономия 550 ₽",
    description: "Маникюр и педикюр с покрытием в одной записи. Экономия 550 ₽, продолжительность — от двух до трёх часов.",
    period: "до 31 декабря 2026",
    image: "/assets/work-01.webp",
    alt: "Работа мастера ClayTone — комбо маникюр и педикюр с покрытием",
  },
];

const paletteSamples = [
  { base: "#625873", light: "#948aa3", dark: "#3d354a" },
  { base: "#7b6b94", light: "#aa9fbb", dark: "#514562" },
  { base: "#955d78", light: "#c28ba0", dark: "#653b50" },
  { base: "#aa6271", light: "#d294a0", dark: "#773f4d" },
  { base: "#bf7b81", light: "#e0aaa9", dark: "#8b5057" },
  { base: "#d1a38d", light: "#ecd0bf", dark: "#9d705d" },
  { base: "#c58a78", light: "#e4b5a1", dark: "#915c4c" },
  { base: "#d59e97", light: "#ecc3bc", dark: "#a36d67" },
  { base: "#e1b3ad", light: "#f2d4cf", dark: "#b7837e" },
  { base: "#ebcbc3", light: "#f8e3dc", dark: "#c49a91" },
  { base: "#f0e4d6", light: "#fff7ec", dark: "#c9b6a1" },
];

export default function MobileClayTone() {
  const [category, setCategory] = useState<"manicure" | "pedicure">("manicure");
  const [expanded, setExpanded] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);
  const [activePromotion, setActivePromotion] = useState(0);
  const [promotionHinting, setPromotionHinting] = useState(false);
  const [promotionInView, setPromotionInView] = useState(false);
  const [promotionActivity, setPromotionActivity] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxTransform, setLightboxTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [desktopGalleryPaused, setDesktopGalleryPaused] = useState(false);
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean | null; label: string }>({
    isOpen: null,
    label: "Ежедневно 10:00–22:00",
  });
  const heroRef = useRef<HTMLElement>(null);
  const finalBookRef = useRef<HTMLElement>(null);
  const beforeAfterRef = useRef<HTMLDivElement>(null);
  const promotionSectionRef = useRef<HTMLElement>(null);
  const promotionRef = useRef<HTMLDivElement>(null);
  const reviewViewportRef = useRef<HTMLDivElement>(null);
  const reviewTrackRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reviewsPausedRef = useRef(false);
  const reviewPointerStartRef = useRef<number | null>(null);
  const reviewScrollStartRef = useRef(0);
  const reviewOffsetRef = useRef(0);
  const reviewSetWidthRef = useRef(0);
  const reviewWasDraggedRef = useRef(false);
  const reviewResumeTimerRef = useRef<number | null>(null);
  const desktopGalleryViewportRef = useRef<HTMLDivElement>(null);
  const desktopGalleryTrackRef = useRef<HTMLDivElement>(null);
  const desktopGalleryPausedRef = useRef(false);
  const desktopGalleryPointerStartRef = useRef<number | null>(null);
  const desktopGalleryStartOffsetRef = useRef(0);
  const desktopGalleryOffsetRef = useRef(0);
  const desktopGallerySetWidthRef = useRef(0);
  const desktopGalleryWasDraggedRef = useRef(false);
  const lightboxGestureRef = useRef({
    mode: "idle" as "idle" | "swipe" | "pan" | "pinch",
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    startScale: 1,
    startDistance: 0,
  });

  const services = category === "manicure" ? manicure : pedicure;
  const visibleServices = useMemo(
    () => category === "manicure" && !expanded ? services.slice(0, 5) : services,
    [category, expanded, services],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    let restored = false;

    document.body.style.overflow = "hidden";
    const restoreScroll = () => {
      if (restored) return;
      restored = true;
      document.body.style.overflow = previousOverflow;
    };
    const timer = window.setTimeout(() => {
      restoreScroll();
      setIntroVisible(false);
    }, reduceMotion ? 180 : 1750);

    return () => {
      window.clearTimeout(timer);
      restoreScroll();
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const viewport = desktopGalleryViewportRef.current;
    const track = desktopGalleryTrackRef.current;
    const firstSet = track?.querySelector<HTMLElement>(".dct-gallery-set");
    if (!viewport || !track || !firstSet) return;

    let frame = 0;
    let lastFrame = 0;
    const renderPosition = (nextOffset: number) => {
      const setWidth = desktopGallerySetWidthRef.current;
      if (setWidth) {
        while (nextOffset <= -setWidth * 2) nextOffset += setWidth;
        while (nextOffset > 0) nextOffset -= setWidth;
      }
      desktopGalleryOffsetRef.current = nextOffset;
      track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
    };

    const measure = () => {
      const nextWidth = firstSet.getBoundingClientRect().width;
      if (!nextWidth) return;
      const previousWidth = desktopGallerySetWidthRef.current;
      desktopGallerySetWidthRef.current = nextWidth;
      renderPosition(previousWidth ? (desktopGalleryOffsetRef.current / previousWidth) * nextWidth : -nextWidth);
    };

    const move = (time: number) => {
      if (!lastFrame) lastFrame = time;
      const elapsed = Math.min(time - lastFrame, 34);
      lastFrame = time;
      if (!desktopGalleryPausedRef.current && document.visibilityState === "visible") {
        renderPosition(desktopGalleryOffsetRef.current - elapsed * .038);
      }
      frame = window.requestAnimationFrame(move);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    measure();
    frame = window.requestAnimationFrame(move);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const finalBook = finalBookRef.current;
    if (!hero || !finalBook) return;

    let frame = 0;
    const updateSticky = () => {
      frame = 0;
      const heroPassed = hero.getBoundingClientRect().bottom <= 0;
      const bookingTop = finalBook.getBoundingClientRect().top;
      const bookingIsApproaching = bookingTop <= window.innerHeight + 96;
      setStickyVisible(heroPassed && !bookingIsApproaching);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSticky);
    };

    updateSticky();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const updateStatus = () => {
      const parts = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const hours = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
      const minutes = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
      const minuteOfDay = hours * 60 + minutes;
      const isOpen = minuteOfDay >= 10 * 60 && minuteOfDay < 22 * 60;

      setOpenStatus({
        isOpen,
        label: isOpen ? "Открыто до 22:00" : "Закрыто до 10:00",
      });
    };

    updateStatus();
    const timer = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!galleryOpen && lightboxIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous };
  }, [galleryOpen, lightboxIndex]);

  useEffect(() => {
    const section = promotionSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting);
        setPromotionInView(isVisible);
        if (!isVisible) setPromotionHinting(false);
      },
      { threshold: 0.24 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!promotionInView || activePromotion !== 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let settleTimer = 0;
    const showHint = () => {
      setPromotionHinting(true);
      settleTimer = window.setTimeout(() => {
        setPromotionHinting(false);
      }, 1150);
    };
    const hintTimer = window.setInterval(showHint, 4_000);

    return () => {
      window.clearInterval(hintTimer);
      window.clearTimeout(settleTimer);
    };
  }, [activePromotion, promotionActivity, promotionInView]);

  useEffect(() => {
    const viewport = reviewViewportRef.current;
    const track = reviewTrackRef.current;
    const firstSet = track?.querySelector<HTMLElement>(".mct-review-set");
    if (!viewport || !track || !firstSet) return;

    let frame = 0;
    let lastFrame = 0;
    const renderPosition = (nextOffset: number) => {
      const setWidth = reviewSetWidthRef.current;
      if (setWidth) {
        while (nextOffset <= -setWidth * 3) nextOffset += setWidth * 2;
        while (nextOffset > -setWidth) nextOffset -= setWidth * 2;
      }
      reviewOffsetRef.current = nextOffset;
      track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
    };

    const measure = () => {
      const nextWidth = firstSet.getBoundingClientRect().width;
      if (!nextWidth) return;
      const previousWidth = reviewSetWidthRef.current;
      reviewSetWidthRef.current = nextWidth;
      renderPosition(previousWidth ? (reviewOffsetRef.current / previousWidth) * nextWidth : -nextWidth * 2);
    };

    const move = (time: number) => {
      if (!lastFrame) lastFrame = time;
      const elapsed = Math.min(time - lastFrame, 34);
      lastFrame = time;

      if (!reviewsPausedRef.current && document.visibilityState === "visible") {
        renderPosition(reviewOffsetRef.current - elapsed * 0.032);
      }
      frame = window.requestAnimationFrame(move);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    measure();
    frame = window.requestAnimationFrame(move);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      if (reviewResumeTimerRef.current !== null) window.clearTimeout(reviewResumeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".mct-reveal"));
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!galleryOpen && lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else setGalleryOpen(false);
      }
      if (lightboxIndex !== null && event.key === "ArrowLeft") {
        setLightboxTransform({ scale: 1, x: 0, y: 0 });
        lightboxGestureRef.current.mode = "idle";
        setLightboxIndex((current) => current === null ? null : (current - 1 + lightboxItems.length) % lightboxItems.length);
      }
      if (lightboxIndex !== null && event.key === "ArrowRight") {
        setLightboxTransform({ scale: 1, x: 0, y: 0 });
        lightboxGestureRef.current.mode = "idle";
        setLightboxIndex((current) => current === null ? null : (current + 1) % lightboxItems.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryOpen, lightboxIndex]);

  const switchCategory = (next: "manicure" | "pedicure") => {
    setCategory(next);
    setExpanded(false);
  };

  const updateBeforeAfterIndex = () => {
    const swiper = beforeAfterRef.current;
    if (!swiper) return;

    const swiperRect = swiper.getBoundingClientRect();
    const swiperCenter = swiperRect.left + swiperRect.width / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(swiper.children).forEach((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - swiperCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveBeforeAfter((current) => current === nearestIndex ? current : nearestIndex);
  };

  const goToBeforeAfter = (index: number) => {
    const swiper = beforeAfterRef.current;
    const card = swiper?.children[index] as HTMLElement | undefined;
    if (!swiper || !card) return;

    const swiperRect = swiper.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left = swiper.scrollLeft + (cardRect.left - swiperRect.left) - (swiper.clientWidth - card.clientWidth) / 2;
    swiper.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const updatePromotionIndex = () => {
    const swiper = promotionRef.current;
    if (!swiper) return;

    const swiperRect = swiper.getBoundingClientRect();
    const swiperCenter = swiperRect.left + swiperRect.width / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(swiper.children).forEach((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - swiperCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (activePromotion !== nearestIndex) {
      setActivePromotion(nearestIndex);
      if (nearestIndex !== 0) setPromotionHinting(false);
      setPromotionActivity((value) => value + 1);
    }
  };

  const goToPromotion = (index: number) => {
    const swiper = promotionRef.current;
    const card = swiper?.children[index] as HTMLElement | undefined;
    if (!swiper || !card) return;

    const swiperRect = swiper.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left = swiper.scrollLeft + (cardRect.left - swiperRect.left) - (swiper.clientWidth - card.clientWidth) / 2;
    setPromotionActivity((value) => value + 1);
    swiper.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const registerPromotionInteraction = () => {
    setPromotionHinting(false);
    setPromotionActivity((value) => value + 1);
  };

  const openLightbox = (src: string) => {
    const index = lightboxItems.findIndex((item) => item.src === src);
    if (index >= 0) {
      setLightboxTransform({ scale: 1, x: 0, y: 0 });
      lightboxGestureRef.current.mode = "idle";
      setLightboxIndex(index);
    }
  };

  const stepLightbox = (direction: -1 | 1) => {
    if (lightboxTransform.scale > 1.01) return;
    setLightboxTransform({ scale: 1, x: 0, y: 0 });
    lightboxGestureRef.current.mode = "idle";
    setLightboxIndex((current) => current === null ? null : (current + direction + lightboxItems.length) % lightboxItems.length);
  };

  const pauseReviews = (clientX?: number) => {
    if (reviewResumeTimerRef.current !== null) {
      window.clearTimeout(reviewResumeTimerRef.current);
      reviewResumeTimerRef.current = null;
    }
    if (reviewTrackRef.current) reviewTrackRef.current.style.transition = "";
    reviewsPausedRef.current = true;
    setReviewsPaused(true);
    reviewPointerStartRef.current = clientX ?? null;
    reviewScrollStartRef.current = reviewOffsetRef.current;
    reviewWasDraggedRef.current = false;
  };

  const moveReviews = (clientX: number) => {
    const pointerStart = reviewPointerStartRef.current;
    const track = reviewTrackRef.current;
    if (pointerStart === null || !track) return;

    const distance = clientX - pointerStart;
    if (Math.abs(distance) > 7) reviewWasDraggedRef.current = true;

    let nextOffset = reviewScrollStartRef.current + distance;
    const setWidth = reviewSetWidthRef.current;
    if (setWidth) {
      while (nextOffset <= -setWidth * 3) nextOffset += setWidth * 2;
      while (nextOffset > -setWidth) nextOffset -= setWidth * 2;
    }
    reviewOffsetRef.current = nextOffset;
    track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
  };

  const resumeReviews = () => {
    reviewPointerStartRef.current = null;
    reviewsPausedRef.current = false;
    setReviewsPaused(false);
  };

  const normalizeReviewOffset = (nextOffset: number) => {
    const setWidth = reviewSetWidthRef.current;
    if (setWidth) {
      while (nextOffset <= -setWidth * 3) nextOffset += setWidth * 2;
      while (nextOffset > -setWidth) nextOffset -= setWidth * 2;
    }
    return nextOffset;
  };

  const setReviewOffset = (nextOffset: number) => {
    const track = reviewTrackRef.current;
    if (!track) return;
    const normalized = normalizeReviewOffset(nextOffset);
    reviewOffsetRef.current = normalized;
    track.style.transform = `translate3d(${normalized}px, 0, 0)`;
  };

  const scheduleReviewsResume = (delay = 520) => {
    if (reviewResumeTimerRef.current !== null) window.clearTimeout(reviewResumeTimerRef.current);
    reviewResumeTimerRef.current = window.setTimeout(() => {
      if (reviewTrackRef.current) reviewTrackRef.current.style.transition = "";
      reviewResumeTimerRef.current = null;
      resumeReviews();
    }, delay);
  };

  const setDesktopGalleryOffset = (nextOffset: number) => {
    const track = desktopGalleryTrackRef.current;
    if (!track) return;
    const setWidth = desktopGallerySetWidthRef.current;
    if (setWidth) {
      while (nextOffset <= -setWidth * 2) nextOffset += setWidth;
      while (nextOffset > 0) nextOffset -= setWidth;
    }
    desktopGalleryOffsetRef.current = nextOffset;
    track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
  };

  const pauseDesktopGallery = (clientX?: number) => {
    desktopGalleryPausedRef.current = true;
    setDesktopGalleryPaused(true);
    desktopGalleryPointerStartRef.current = clientX ?? null;
    desktopGalleryStartOffsetRef.current = desktopGalleryOffsetRef.current;
    desktopGalleryWasDraggedRef.current = false;
  };

  const moveDesktopGallery = (clientX: number) => {
    const start = desktopGalleryPointerStartRef.current;
    if (start === null) return;
    const distance = clientX - start;
    if (Math.abs(distance) > 7) desktopGalleryWasDraggedRef.current = true;
    setDesktopGalleryOffset(desktopGalleryStartOffsetRef.current + distance);
  };

  const resumeDesktopGallery = () => {
    desktopGalleryPointerStartRef.current = null;
    desktopGalleryPausedRef.current = false;
    setDesktopGalleryPaused(false);
  };

  const stepReviews = (direction: -1 | 1) => {
    const track = reviewTrackRef.current;
    if (!track) return;
    const card = reviewViewportRef.current?.querySelector<HTMLElement>(".mct-review-card");
    const step = (card?.getBoundingClientRect().width ?? 440) + 16;
    pauseReviews();
    track.style.transition = "transform 420ms cubic-bezier(.22, .78, .25, 1)";
    setReviewOffset(reviewOffsetRef.current - direction * step);
    scheduleReviewsResume(460);
  };

  const getTouchDistance = (event: ReactTouchEvent<HTMLElement>) => {
    const first = event.touches[0];
    const second = event.touches[1];
    if (!first || !second) return 0;
    return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
  };

  const clampLightboxOffset = (x: number, y: number, scale: number) => {
    const maxX = Math.max(0, (window.innerWidth * (scale - 1)) / 2);
    const maxY = Math.max(0, (window.innerHeight * 0.68 * (scale - 1)) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const startLightboxGesture = (event: ReactTouchEvent<HTMLElement>) => {
    if (event.touches.length >= 2) {
      lightboxGestureRef.current = {
        mode: "pinch",
        startX: 0,
        startY: 0,
        originX: lightboxTransform.x,
        originY: lightboxTransform.y,
        startScale: lightboxTransform.scale,
        startDistance: getTouchDistance(event),
      };
      return;
    }

    const touch = event.touches[0];
    if (!touch) return;
    lightboxGestureRef.current = {
      mode: lightboxTransform.scale > 1.01 ? "pan" : "swipe",
      startX: touch.clientX,
      startY: touch.clientY,
      originX: lightboxTransform.x,
      originY: lightboxTransform.y,
      startScale: lightboxTransform.scale,
      startDistance: 0,
    };
  };

  const moveLightboxGesture = (event: ReactTouchEvent<HTMLElement>) => {
    const gesture = lightboxGestureRef.current;

    if (event.touches.length >= 2) {
      event.preventDefault();
      const distance = getTouchDistance(event);
      if (gesture.mode !== "pinch" || !gesture.startDistance) {
        lightboxGestureRef.current = {
          ...gesture,
          mode: "pinch",
          startScale: lightboxTransform.scale,
          startDistance: distance,
          originX: lightboxTransform.x,
          originY: lightboxTransform.y,
        };
        return;
      }

      const scale = Math.max(1, Math.min(4, gesture.startScale * (distance / gesture.startDistance)));
      const offset = scale <= 1.01 ? { x: 0, y: 0 } : clampLightboxOffset(gesture.originX, gesture.originY, scale);
      setLightboxTransform({ scale, ...offset });
      return;
    }

    const touch = event.touches[0];
    if (!touch || gesture.mode !== "pan") return;
    event.preventDefault();
    const offset = clampLightboxOffset(
      gesture.originX + touch.clientX - gesture.startX,
      gesture.originY + touch.clientY - gesture.startY,
      lightboxTransform.scale,
    );
    setLightboxTransform((current) => ({ ...current, ...offset }));
  };

  const finishLightboxGesture = (event: ReactTouchEvent<HTMLElement>) => {
    const gesture = lightboxGestureRef.current;

    if (event.touches.length === 1) {
      const touch = event.touches[0];
      lightboxGestureRef.current = {
        ...gesture,
        mode: lightboxTransform.scale > 1.01 ? "pan" : "idle",
        startX: touch.clientX,
        startY: touch.clientY,
        originX: lightboxTransform.x,
        originY: lightboxTransform.y,
      };
      return;
    }

    if (gesture.mode === "swipe" && lightboxTransform.scale <= 1.01) {
      const touch = event.changedTouches[0];
      const distanceX = (touch?.clientX ?? gesture.startX) - gesture.startX;
      const distanceY = (touch?.clientY ?? gesture.startY) - gesture.startY;
      if (Math.abs(distanceX) > 42 && Math.abs(distanceX) > Math.abs(distanceY)) {
        stepLightbox(distanceX > 0 ? -1 : 1);
      }
    }

    if (lightboxTransform.scale <= 1.01) setLightboxTransform({ scale: 1, x: 0, y: 0 });
    lightboxGestureRef.current.mode = "idle";
  };

  return (
    <div className="mct-mobile">
      {introVisible && (
        <div className="mct-intro" aria-hidden="true">
          <div className="mct-intro-mark">
            <span>ClayTone</span>
            <i />
            <small>Nail studio</small>
          </div>
        </div>
      )}

      <header className="mct-hero" id="mobile-top" ref={heroRef}>
        <div className="mct-shell">
          <div className="mct-topbar">
            <a className="mct-brand" href="#mobile-top" aria-label="ClayTone, наверх">ClayTone</a>
            <nav className="dct-navigation" aria-label="Основные разделы сайта">
              <a href="#mobile-prices">Услуги и цены</a>
              <a href="#mobile-promotions">Акции</a>
              <a href="#mobile-about">О мастере</a>
              <a href="#mobile-reviews">Отзывы</a>
              <a href="#mobile-location">Визит и запись</a>
            </nav>
            <div className="dct-top-actions" aria-label="Быстрые способы связи с ClayTone">
              <a className="dct-top-phone" href="tel:+79054141088" aria-label="Позвонить Нонне по номеру +7 905 414-10-88">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5 9.3 8c.2.5.1 1-.3 1.4l-1.4 1.2c1 2.1 2.7 3.8 4.8 4.8l1.2-1.4c.4-.4.9-.5 1.4-.3l4.5 2.2c.5.2.8.8.6 1.4l-.6 2.3c-.2.7-.8 1.1-1.5 1.1C10 20.7 3.3 14 3.3 6c0-.7.4-1.3 1.1-1.5l2.3-.6c.6-.2 1.2.1 1.4.6Z" /></svg>
                <span><small>Позвонить</small><strong>+7 905 414-10-88</strong></span>
              </a>
              <a className="dct-top-icon" href={personalTelegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Написать Нонне в Telegram" title="Telegram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              </a>
              <a className="dct-top-icon" href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label="Открыть ClayTone в Яндекс Картах" title="Яндекс Карты">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              </a>
            </div>
            <div className="mct-menu-wrap" ref={menuRef}>
              <button
                className={`mct-menu-button${menuOpen ? " is-open" : ""}`}
                type="button"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span /><span /><span />
              </button>
              {menuOpen && (
                <nav className="mct-menu-panel" id="mobile-navigation" aria-label="Разделы сайта">
                  <a href="#mobile-portfolio" onClick={() => setMenuOpen(false)}><span>•</span>Портфолио</a>
                  <a href="#mobile-prices" onClick={() => setMenuOpen(false)}><span>•</span>Услуги и цены</a>
                  <a href="#mobile-promotions" onClick={() => setMenuOpen(false)}><span>•</span>Акции</a>
                  <a href="#mobile-about" onClick={() => setMenuOpen(false)}><span>•</span>О мастере</a>
                  <a href="#mobile-reviews" onClick={() => setMenuOpen(false)}><span>•</span>Отзывы</a>
                  <a href="#mobile-location" onClick={() => setMenuOpen(false)}><span>•</span>Визит и запись</a>
                </nav>
              )}
            </div>
          </div>
          <div className="mct-hero-content">
            <div className="mct-hero-meta">
              <span>Москва · м. Спортивная</span>
              <a className="mct-hero-phone" href="tel:+79054141088" aria-label="Позвонить Нонне по номеру +7 905 414-10-88">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M7.1 3.5 9.3 8c.2.5.1 1-.3 1.4l-1.4 1.2c1 2.1 2.7 3.8 4.8 4.8l1.2-1.4c.4-.4.9-.5 1.4-.3l4.5 2.2c.5.2.8.8.6 1.4l-.6 2.3c-.2.7-.8 1.1-1.5 1.1C10 20.7 3.3 14 3.3 6c0-.7.4-1.3 1.1-1.5l2.3-.6c.6-.2 1.2.1 1.4.6Z" />
                </svg>
                <span>+7 905 414-10-88</span>
              </a>
            </div>
            <h1>Нонна — мастер <em>ногтевого сервиса</em></h1>
            <p className="mct-hero-copy">Маникюр, педикюр и наращивание с аккуратной обработкой, стерильными инструментами и вниманием к форме.</p>
          </div>
          <div
            className="mct-hero-visual"
          >
            <figure className="dct-hero-portrait">
              <img src="/assets/nonna-portrait.jpeg" alt="Нонна, мастер ногтевого сервиса ClayTone" />
              <figcaption><span>ClayTone</span><small>Индивидуальная работа мастера</small></figcaption>
            </figure>
            <div className="mct-palette-stage" aria-hidden="true">
              <div className="mct-palette-set">
                {paletteSamples.map((shade, index) => {
                  const leftAngle = -47 + (94 / (paletteSamples.length - 1)) * index;
                  const rightAngle = -leftAngle;
                  const armGradientId = `mct-palette-arm-${index}`;
                  const tipGradientId = `mct-palette-tip-${index}`;
                  const tipGlossId = `mct-palette-gloss-${index}`;
                  const armGlowId = `mct-palette-arm-glow-${index}`;
                  const tipBloomId = `mct-palette-bloom-${index}`;

                  return (
                    <span
                      className="mct-palette-stick"
                      key={`${shade.base}-${index}`}
                      style={{
                        "--left-angle": `${leftAngle}deg`,
                        "--right-angle": `${rightAngle}deg`,
                        "--stack": index + 1,
                      } as CSSProperties}
                    >
                      <svg viewBox="0 0 54 320" aria-hidden="true" focusable="false">
                        <defs>
                          <linearGradient id={armGradientId} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#a7a39d" stopOpacity=".42" />
                            <stop offset="0.13" stopColor="#e8e6e1" stopOpacity=".66" />
                            <stop offset="0.38" stopColor="#fffefb" stopOpacity=".84" />
                            <stop offset="0.62" stopColor="#f4f2ed" stopOpacity=".68" />
                            <stop offset="0.87" stopColor="#d2cec7" stopOpacity=".5" />
                            <stop offset="1" stopColor="#96918a" stopOpacity=".48" />
                          </linearGradient>
                          <linearGradient id={armGlowId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#fff" stopOpacity=".82" />
                            <stop offset=".45" stopColor="#fff" stopOpacity=".2" />
                            <stop offset="1" stopColor="#fff" stopOpacity=".55" />
                          </linearGradient>
                          <linearGradient id={tipGradientId} x1="0" y1="0" x2="1" y2="0.12">
                            <stop offset="0" stopColor={shade.light} />
                            <stop offset="0.22" stopColor={shade.base} />
                            <stop offset="0.7" stopColor={shade.base} />
                            <stop offset="1" stopColor={shade.dark} />
                          </linearGradient>
                          <linearGradient id={tipGlossId} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#fff" stopOpacity="0" />
                            <stop offset="0.31" stopColor="#fff" stopOpacity=".76" />
                            <stop offset="0.5" stopColor="#fff" stopOpacity=".17" />
                            <stop offset="1" stopColor="#fff" stopOpacity="0" />
                          </linearGradient>
                          <radialGradient id={tipBloomId} cx="38%" cy="22%" r="74%">
                            <stop offset="0" stopColor="#fff" stopOpacity=".34" />
                            <stop offset=".5" stopColor={shade.base} stopOpacity=".05" />
                            <stop offset="1" stopColor={shade.dark} stopOpacity=".2" />
                          </radialGradient>
                        </defs>
                        <path
                          className="mct-palette-arm"
                          d="M17 75 Q17 68 22 64 H32 Q37 68 37 75 V87 Q37 92 41 98 L43 307 Q43 316 35 318 H19 Q11 316 11 307 L13 98 Q17 92 17 87 Z"
                          fill={`url(#${armGradientId})`}
                        />
                        <path className="mct-palette-arm-glow" d="M20 76 Q20 70 24 68 H28 L29 309 Q29 314 25 315 H21 Q16 313 16 306 L18 99 Q20 92 20 86 Z" fill={`url(#${armGlowId})`} />
                        <path className="mct-palette-arm-light" d="M18 78 Q18 91 15 99 L15 305 Q15 312 21 314" />
                        <path className="mct-palette-arm-edge" d="M36 76 Q36 91 39 99 L42 305 Q42 312 36 315" />
                        <path className="mct-palette-tip-cast" d="M10 56 Q10 49 16 47 H38 Q44 49 44 56 V70 Q44 81 36 88 H18 Q10 81 10 70 Z" />
                        <path
                          className="mct-palette-tip"
                          d="M12 22 C12 9 18 3 27 3 C36 3 42 9 42 22 V57 C42 74 36 86 27 92 C18 86 12 74 12 57 Z"
                          fill={`url(#${tipGradientId})`}
                        />
                        <path className="mct-palette-tip-bloom" d="M13 22 C13 10 19 4 27 4 C35 4 41 10 41 22 V56 C41 72 35 83 27 89 C19 83 13 72 13 56 Z" fill={`url(#${tipBloomId})`} />
                        <path className="mct-palette-tip-shade" d="M35 6 Q41 12 41 23 V56 Q41 72 34 82 Q37 62 36 39 Q36 17 35 6 Z" />
                        <path
                          className="mct-palette-tip-gloss"
                          d="M19 8 Q14 19 15 43 Q15 67 20 79 Q23 84 25 75 Q21 55 22 34 Q22 16 24 7 Q21 6 19 8 Z"
                          fill={`url(#${tipGlossId})`}
                        />
                        <path className="mct-palette-tip-highlight" d="M19 8 Q27 2 35 8" />
                        <path className="mct-palette-tip-rim" d="M13 23 Q13 10 22 5 M41 23 Q41 10 32 5" />
                      </svg>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mct-hero-bottom">
            <div className="mct-hero-actions">
              <a className="mct-main-cta" href={bookingUrl} target="_blank" rel="noopener noreferrer">Записаться онлайн&nbsp; →</a>
              <a className="mct-quiet-link" href="#mobile-portfolio">Смотреть работы ↓</a>
            </div>
            <div className="mct-stats" aria-label="Опыт и рейтинг мастера">
              <div className="mct-stat"><strong>8</strong><span>лет опыта</span></div>
              <div className="mct-stat"><strong>5,0 <i className="mct-stat-star">★</i></strong><span>рейтинг</span></div>
              <div className="mct-stat"><strong>95</strong><span>оценок</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="mct-section" id="mobile-portfolio">
        <div className="mct-shell mct-reveal">
          <div className="mct-section-head">
            <div><p className="mct-section-kicker">Портфолио</p><h2>До / после</h2></div>
            <p className="mct-section-note">Реальные примеры обработки, формы и покрытия</p>
          </div>
        </div>
        <div className="mct-ba-stage mct-reveal">
          <div className="mct-ba-swiper" ref={beforeAfterRef} onScroll={updateBeforeAfterIndex} aria-label={`${beforeAfter.length} примера до и после`}>
            {beforeAfter.map((item) => (
              <figure className="mct-ba-card" key={item.src}>
                <button className="mct-ba-open" type="button" onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} draggable="false" />
                </button>
                <figcaption className="mct-ba-labels"><span>До</span><span>После</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="mct-ba-pagination" aria-label={`Пример ${activeBeforeAfter + 1} из ${beforeAfter.length}`}>
            {beforeAfter.map((item, index) => (
              <button
                className={activeBeforeAfter === index ? "is-active" : ""}
                type="button"
                key={item.src}
                aria-label={`Показать пример ${index + 1}`}
                aria-current={activeBeforeAfter === index ? "true" : undefined}
                onClick={() => goToBeforeAfter(index)}
              />
            ))}
          </div>
        </div>
        <div className="mct-shell mct-reveal">
          <div className="mct-work-grid" aria-label="Подборка работ">
            {featuredWorks.map((item) => (
              <button className="mct-work-tile" type="button" key={item.src} onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="dct-film-strip" aria-label="Бесконечная галерея работ Нонны">
            <div
              className={`dct-gallery-viewport${desktopGalleryPaused ? " is-paused" : ""}`}
              ref={desktopGalleryViewportRef}
              onMouseEnter={() => pauseDesktopGallery()}
              onMouseLeave={resumeDesktopGallery}
              onPointerDown={(event) => {
                if (!event.isPrimary) return;
                pauseDesktopGallery(event.clientX);
                if (event.pointerType === "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!event.isPrimary || desktopGalleryPointerStartRef.current === null) return;
                moveDesktopGallery(event.clientX);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
                resumeDesktopGallery();
              }}
              onPointerCancel={resumeDesktopGallery}
            >
              <div className="dct-gallery-track" ref={desktopGalleryTrackRef}>
                {Array.from({ length: desktopGallerySetCount }, (_, setIndex) => (
                  <div className="dct-gallery-set" key={`gallery-set-${setIndex}`} aria-hidden={setIndex !== 1}>
                    {desktopGalleryModules.map((module, moduleIndex) => (
                      <div className={`dct-gallery-module dct-gallery-module-${moduleIndex + 1}`} key={`gallery-module-${setIndex}-${moduleIndex}`}>
                        {module.map((item, itemIndex) => (
                          <button
                            className={`dct-film-frame dct-film-frame-${itemIndex + 1}`}
                            type="button"
                            key={`${setIndex}-${item.src}`}
                            onClick={(event) => {
                              if (desktopGalleryWasDraggedRef.current) {
                                event.preventDefault();
                                desktopGalleryWasDraggedRef.current = false;
                                return;
                              }
                              openLightbox(item.src);
                            }}
                            aria-label={`Открыть фотографию: ${item.alt}`}
                            tabIndex={setIndex === 1 ? 0 : -1}
                          >
                            <img src={item.src} alt={item.alt} loading="lazy" draggable="false" />
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="mct-gallery-button" type="button" onClick={() => setGalleryOpen(true)}><span>Открыть галерею</span><span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="mct-prices mct-reveal" id="mobile-prices">
        <div className="mct-shell">
          <div className="mct-price-head">
            <p className="mct-section-kicker">Услуги и цены</p>
            <h2>Выберите<br />услугу</h2>
            <span>Актуальная стоимость и продолжительность указаны для каждой процедуры. Онлайн-запись откроется в новой вкладке.</span>
          </div>
          <div className="mct-tabs" role="tablist" aria-label="Категории услуг">
            <button className={`mct-tab${category === "manicure" ? " is-active" : ""}`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={`mct-tab${category === "pedicure" ? " is-active" : ""}`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
          </div>
          <div className="mct-service-list">
            {visibleServices.map((service) => (
              <article className="mct-service-row" key={service.name}>
                <div className="mct-service-name"><strong>{service.name}</strong><p className="dct-service-description">{service.description}</p><small>{service.time}</small></div>
                <div className="mct-service-action"><b>{service.price}</b><a href={service.url} target="_blank" rel="noopener noreferrer">Записаться →</a></div>
              </article>
            ))}
          </div>
          {category === "manicure" && (
            <button className={`mct-more-services${expanded ? " is-open" : ""}`} type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Свернуть услуги" : `Показать ещё ${manicure.length - 5} услуг`}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>
      </section>

      <section className="mct-promotions mct-reveal" id="mobile-promotions" ref={promotionSectionRef}>
        <div className="mct-shell">
          <div className="mct-promotions-head">
            <div><p className="mct-section-kicker">Акции ClayTone</p><h2>Выгодные<br />предложения</h2></div>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Выбрать акцию →</a>
          </div>
          <div
            className={`mct-promotion-list${promotionHinting ? " is-hinting" : ""}`}
            ref={promotionRef}
            onScroll={updatePromotionIndex}
            onTouchStart={registerPromotionInteraction}
            onPointerDown={(event) => { if (event.pointerType === "mouse") registerPromotionInteraction(); }}
            aria-label={`${promotions.length} акции ClayTone. Листайте горизонтально.`}
          >
            {promotions.map((promotion) => (
              <article className="mct-promotion-card" key={promotion.title}>
                <figure><img src={promotion.image} alt={promotion.alt} loading="lazy" /></figure>
                <div className="mct-promotion-copy">
                  <span>{promotion.period}</span>
                  <h3>{promotion.title}</h3>
                  <strong className="mct-promotion-benefit">{promotion.highlight}</strong>
                  <p>{promotion.description}</p>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Записаться по акции →</a>
                </div>
              </article>
            ))}
          </div>
          <div className="mct-promotion-pagination" aria-label={`Акция ${activePromotion + 1} из ${promotions.length}`}>
            {promotions.map((promotion, index) => (
              <button
                className={activePromotion === index ? "is-active" : ""}
                type="button"
                key={promotion.title}
                aria-label={`Показать акцию ${index + 1}: ${promotion.title}`}
                aria-current={activePromotion === index ? "true" : undefined}
                onClick={() => goToPromotion(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mct-about mct-reveal" id="mobile-about">
        <div className="mct-shell">
          <div className="mct-about-head">
            <div><p className="mct-section-kicker">О мастере</p><h2>Нонна — мастер<br />ClayTone</h2></div>
            <span className="mct-about-monogram" aria-hidden="true">N</span>
          </div>
          <div className="mct-about-card">
            <div className="mct-about-portrait-wrap">
              <figure className="mct-about-portrait">
                <img src="/assets/nonna-about.webp" alt="Нонна, мастер маникюра и педикюра ClayTone" loading="lazy" />
              </figure>
              <div className="mct-about-experience" aria-label="Восемь лет опыта">
                <strong>8</strong>
                <span>лет<br />опыта</span>
              </div>
            </div>
            <div className="mct-about-copy">
              <p className="mct-about-lead">Я Нонна — дипломированный мастер маникюра и педикюра.</p>
              <p>Более восьми лет я работаю с разной длиной и формой ногтей: выполняю аккуратный маникюр, педикюр, укрепление и наращивание.</p>
              <p>Перед процедурой мы обсуждаем желаемый результат, подбираем форму и покрытие. Инструменты проходят обязательную стерилизацию, а работа строится без спешки и лишних процедур.</p>
              <ul className="mct-about-list"><li>Маникюр и педикюр</li><li>Наращивание и коррекция</li><li>Стерильные инструменты</li></ul>
            </div>
          </div>

          <div className="mct-amenities" aria-label="Удобства для визита в ClayTone">
            <div className="mct-amenities-head"><p className="mct-section-kicker">Удобства для визита</p><span>Всё необходимое для спокойного посещения</span></div>
            <div className="mct-amenities-grid">
              <article><strong>Наращивание</strong><span>Наращивание и коррекция ногтей</span></article>
              <article><strong>Wi‑Fi</strong><span>Доступен во время процедуры</span></article>
              <article><strong>Парковка рядом</strong><span>Можно приехать на автомобиле</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="mct-reviews mct-reveal" id="mobile-reviews">
        <div className="mct-shell">
          <p className="mct-section-kicker">Отзывы</p><h2>Что говорят<br />клиенты</h2>
          <a className="mct-review-summary" href={reviewsUrl} target="_blank" rel="noopener noreferrer"><strong>5,0</strong><span>95 оценок<br />Все отзывы на Яндексе →</span></a>
          <p className="dct-review-drag-hint">Зажмите ленту мышью и двигайте в любую сторону</p>
          <div className="dct-review-controls" aria-label="Управление лентой отзывов">
            <button type="button" onClick={() => stepReviews(-1)} aria-label="Показать предыдущие отзывы">←</button>
            <button type="button" onClick={() => stepReviews(1)} aria-label="Показать следующие отзывы">→</button>
          </div>
        </div>
        <div
          className={`mct-review-viewport${reviewsPaused ? " is-paused" : ""}`}
          ref={reviewViewportRef}
          aria-label="Настоящие отзывы клиентов ClayTone. Лента движется автоматически, при касании останавливается."
          onPointerDown={(event) => {
            if (!event.isPrimary) return;
            pauseReviews(event.clientX);
            if (event.pointerType === "mouse" && window.matchMedia("(min-width: 768px)").matches && !event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerMove={(event) => {
            if (!event.isPrimary || !reviewsPausedRef.current) return;
            if (reviewPointerStartRef.current !== null && Math.abs(event.clientX - reviewPointerStartRef.current) > 7 && !event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            moveReviews(event.clientX);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            resumeReviews();
          }}
          onPointerCancel={resumeReviews}
          onWheel={(event) => {
            const horizontalDelta = event.shiftKey ? event.deltaY : event.deltaX;
            if (Math.abs(horizontalDelta) < 1 || Math.abs(horizontalDelta) < Math.abs(event.deltaY) * .55) return;
            event.preventDefault();
            pauseReviews();
            setReviewOffset(reviewOffsetRef.current - horizontalDelta * 1.12);
            scheduleReviewsResume();
          }}
        >
          <div className="mct-review-track" ref={reviewTrackRef}>
            {Array.from({ length: reviewSetCount }, (_, setIndex) => (
              <div className="mct-review-set" key={setIndex} aria-hidden={setIndex !== 2}>
                {reviews.map((review) => (
                  <a
                    className="mct-review-card"
                    href={reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${setIndex}-${review.author}`}
                    tabIndex={setIndex === 2 ? 0 : -1}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    onClick={(event) => {
                      if (!reviewWasDraggedRef.current) return;
                      event.preventDefault();
                      reviewWasDraggedRef.current = false;
                    }}
                  >
                    <span>★★★★★</span>
                    <blockquote>«{review.text}»</blockquote>
                    <small>{review.author} · Яндекс Карты</small>
                    <i>Открыть отзыв →</i>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mct-visit mct-reveal" id="mobile-location" ref={finalBookRef}>
        <div className="mct-shell">
          <div className="mct-visit-booking" id="mobile-booking">
            <div className="mct-visit-booking-top">
              <p className="mct-section-kicker">Запись и связь</p>
              <span className={`mct-open-status${openStatus.isOpen === true ? " is-open" : openStatus.isOpen === false ? " is-closed" : ""}`}>
                <i aria-hidden="true" />{openStatus.label}
              </span>
            </div>
            <h3>Запишитесь онлайн<br /><em>или свяжитесь любым удобным способом</em></h3>
            <p>Выберите свободное время в календаре. Если нужно уточнить услугу, дизайн или длительность процедуры, напишите Нонне напрямую.</p>
            <div className="mct-visit-actions">
              <a className="mct-final-cta" href={bookingUrl} target="_blank" rel="noopener noreferrer"><span>Выбрать время онлайн</span><i className="mct-link-arrow" aria-hidden="true" /></a>
              <div className="mct-final-contact-grid" aria-label="Все способы связи с ClayTone">
                <a className="mct-final-secondary" href="tel:+79054141088">
                  <span className="mct-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg></span>
                  <span className="mct-contact-copy"><strong>Позвонить</strong><small>Нонне · +7 905 414-10-88</small></span><i className="mct-link-arrow" aria-hidden="true" />
                </a>
                <a className="mct-final-secondary" href={personalTelegramUrl} target="_blank" rel="noopener noreferrer">
                  <span className="mct-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg></span>
                  <span className="mct-contact-copy"><strong>Личный Telegram</strong><small>Написать Нонне</small></span><i className="mct-link-arrow" aria-hidden="true" />
                </a>
                <a className="mct-final-secondary" href={channelTelegramUrl} target="_blank" rel="noopener noreferrer">
                  <span className="mct-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg></span>
                  <span className="mct-contact-copy"><strong>Telegram-канал</strong><small>Работы и новости</small></span><i className="mct-link-arrow" aria-hidden="true" />
                </a>
                <a className="mct-final-secondary" href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <span className="mct-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
                  <span className="mct-contact-copy"><strong>Яндекс Карты</strong><small>Отзывы и маршрут</small></span><i className="mct-link-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="mct-visit-details">
            <p className="mct-visit-address">Москва, Кооперативная улица, 4, корп. 9<span>м. Спортивная · ежедневно 10:00–22:00</span></p>
            <div className="mct-map-wrap">
              <iframe
                className="mct-map-mobile"
                src={mobileMapEmbedUrl}
                title="ClayTone на Яндекс Картах"
                loading="lazy"
                allowFullScreen
              />
              <iframe
                className="dct-map-desktop"
                src={desktopMapEmbedUrl}
                title="Точка ClayTone на Яндекс Картах"
                loading="lazy"
                allowFullScreen
              />
              <a href={routeUrl} target="_blank" rel="noopener noreferrer" aria-label="Построить маршрут до ClayTone в Яндекс Картах">Построить маршрут →</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="dct-footer">
        <a href="#mobile-top" aria-label="ClayTone, вернуться наверх">ClayTone</a>
        <span>Маникюр и педикюр от Нонны · Москва</span>
      </footer>

      <div className={`mct-sticky-wrap${stickyVisible && !galleryOpen ? " is-visible" : ""}`} aria-hidden={!stickyVisible || galleryOpen}>
        <a className="mct-sticky" href={bookingUrl} target="_blank" rel="noopener noreferrer" tabIndex={stickyVisible && !galleryOpen ? 0 : -1}>
          <span className="mct-sticky-icon dct-sticky-mobile-mark">C</span><span className="dct-sticky-live" aria-hidden="true"><i /></span><span className="mct-sticky-copy"><strong>Записаться онлайн</strong><small>Открыть свободное время</small></span><span className="mct-sticky-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      {galleryOpen && (
        <div className="mct-gallery-overlay" role="dialog" aria-modal="true" aria-label="Галерея ClayTone">
          <div className="mct-gallery-top"><strong>Галерея</strong><button className="mct-gallery-close" type="button" onClick={() => setGalleryOpen(false)} aria-label="Закрыть галерею">×</button></div>
          <div className="mct-gallery-content">
            <h3>До / после</h3>
            <div className="mct-gallery-ba" aria-label="До и после — горизонтальная галерея">
              {beforeAfter.map((item) => (
                <figure className="mct-gallery-ba-card" key={item.src}>
                  <button className="mct-gallery-image" type="button" onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}><img src={item.src} alt={item.alt} draggable="false" /></button>
                  <figcaption className="mct-ba-labels"><span>До</span><span>После</span></figcaption>
                </figure>
              ))}
            </div>
            <h3>Работы</h3>
            <div className="mct-gallery-works">
              {galleryWorks.map((item) => (
                <button className="mct-gallery-image" type="button" key={item.src} onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <div className={`mct-lightbox${lightboxTransform.scale > 1.01 ? " is-zoomed" : ""}`} role="dialog" aria-modal="true" aria-label="Полноэкранный просмотр фотографии" onClick={() => setLightboxIndex(null)}>
          <button className="mct-lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Закрыть фотографию">×</button>
          <span className="mct-lightbox-hint">Разведите двумя пальцами, чтобы увеличить</span>
          <button className="mct-lightbox-nav mct-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); stepLightbox(-1); }} aria-label="Предыдущая фотография" tabIndex={lightboxTransform.scale > 1.01 ? -1 : 0}>‹</button>
          <figure
            className="mct-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={startLightboxGesture}
            onTouchMove={moveLightboxGesture}
            onTouchEnd={finishLightboxGesture}
            onTouchCancel={finishLightboxGesture}
          >
            <div className="mct-lightbox-image-stage">
              <img
                src={lightboxItems[lightboxIndex].src}
                alt={lightboxItems[lightboxIndex].alt}
                draggable="false"
                style={{ transform: `translate3d(${lightboxTransform.x}px, ${lightboxTransform.y}px, 0) scale(${lightboxTransform.scale})` }}
              />
            </div>
            <figcaption><span>{lightboxItems[lightboxIndex].alt}</span><small>{String(lightboxIndex + 1).padStart(2, "0")} / {String(lightboxItems.length).padStart(2, "0")}</small></figcaption>
          </figure>
          <button className="mct-lightbox-nav mct-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); stepLightbox(1); }} aria-label="Следующая фотография" tabIndex={lightboxTransform.scale > 1.01 ? -1 : 0}>›</button>
        </div>
      )}
    </div>
  );
}

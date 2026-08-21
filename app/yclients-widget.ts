type BookingClickEvent = {
  preventDefault: () => void;
};

const bookingProxyId = "yclients-booking-proxy";

export function openYclientsWidget(event: BookingClickEvent, url: string) {
  event.preventDefault();

  const proxy = document.getElementById(bookingProxyId) as HTMLAnchorElement | null;
  if (!proxy) return;

  proxy.dataset.url = url;
  proxy.click();
}

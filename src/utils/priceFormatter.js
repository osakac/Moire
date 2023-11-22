export function priceFormatter(price) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

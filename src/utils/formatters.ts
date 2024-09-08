export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const eur = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export const percentage = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
});

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

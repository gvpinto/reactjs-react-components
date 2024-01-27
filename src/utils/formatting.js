import {
  formatISO,
  format,
  formatDistance,
  formatRelative,
  subDays,
  parseISO,
} from 'date-fns';

const us_currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// TODO: Implement Locales
export function currency(value, type) {
  return us_currency.format(value);
}

// TODO: Implement Date Type (Short, Medium, Long)
export function dateFromString(dateString, type) {
  const date = parseISO(dateString);
  return format(date, 'MM/dd/yyyy');
}

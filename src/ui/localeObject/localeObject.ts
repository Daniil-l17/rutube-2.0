export const localeObject = {
  name: 'ru', // name String
  weekdays: 'Domingo_Lunes ...'.split('_'), // weekdays Array
  weekdaysShort: 'Sun_M'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
  weekdaysMin: 'Su_Mo'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
  weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
  yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
  months: 'Enero_Febrero ... '.split('_'), // months Array
  monthsShort: 'Jan_F'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
  formats: {
    // abbreviated format options allowing localization
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    // lowercase/short, optional formats for localization
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A',
  },
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    future: 'in %s', // e.g. in 2 hours, %s been replaced with 2hours
    past: '%s ',
    s: ' секунд назад',
    m: 'минуту назад',
    mm: '%d минут назад',
    h: 'час назад',
    hh: '%d часов назад', // e.g. 2 hours, %d been replaced with 2
    d: 'день назад',
    dd: '%d дня назад',
    M: ' месяцев назад',
    MM: '%d месяцев назад',
    y: 'a лет назад',
    yy: '%d years',
  },
};
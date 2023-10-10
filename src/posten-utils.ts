import moment from 'moment-with-locales-es6';
import { Moment } from 'moment';

import { PostenCardConfig } from './types';
import { localize } from './localize/localize';
import { DeliveryDay } from './types';
import * as dateUtils from './date-utils';

const months = {
  januar: 1,
  februar: 2,
  mars: 3,
  april: 4,
  mai: 5,
  juni: 6,
  juli: 7,
  august: 8,
  september: 9,
  oktober: 10,
  november: 11,
  desember: 12,
};

export const defaultNumOfDays = 6;
export const defaultDateFormat = 'dddd D. MMMM';
export const defaultDeliveryTodayIcon = 'mdi:mailbox-open';
export const defaultNoDeliveryTodayIcon = 'mdi:mailbox';
export const defaultHideLogo = false;
export const defaultHideDeliveryTodayIcon = false;
export const defaultUsePostenBackgroundColor = true;

const daysUntil = (today: Moment, deliveryDay: Moment): number =>
  moment.duration(deliveryDay.startOf('day').diff(today.startOf('day'))).days();

export const daysUntilText = (daysUntil: number): string | undefined => {
  // Don't display if 'today' or  'tomorrow'
  if (daysUntil > 1) {
    return localize('common.days_until', 'DAYS_UNTIL', '' + daysUntil);
  }
  return undefined;
};

export const deliveryDayText = (idx: number, deliveryDay: Moment, formattedDate: string): string => {
  const isDeliveryToday = dateUtils.isDeliveryToday(deliveryDay);
  const isDeliveryTomorrow = dateUtils.isDeliveryTommorow(deliveryDay);

  if (isDeliveryToday && idx === 0) {
    return localize('common.today');
  } else if (isDeliveryTomorrow && idx === 0) {
    return localize('common.tomorrow');
  } else {
    return formattedDate || 'N/A';
  }
};
//['2023-10-09', '2023-10-11', '2023-10-13', '2023-10-17', '2023-10-19', '2023-10-23'] //  console.write('test');
define(['moment', 'moment/locale/de'], function (moment) {
    moment.locale('de');
    console.log(moment().format('LLLL')); // 'Freitag, 24. Juni 2016 01:42'
});
const parseDeliveryDay = (deliveryDay: string, locale: string, config: PostenCardConfig): DeliveryDay => {
  const dateFormat = !config.date_format || config.date_format.trim() === '' ? defaultDateFormat : config.date_format;
  const segments = deliveryDay.split('-');
  console.log('test');
  const deliveryDayMoment = moment().month(months[segments[1]]).date(segments[2]);
  const formattedDate = dateUtils.formatDate(locale, dateFormat, deliveryDayMoment).capitalize();
  const daysUntilDelivery = daysUntil(moment(), deliveryDayMoment);
  const isDeliveryToday = dateUtils.isDeliveryToday(deliveryDayMoment);

  return {
    date: deliveryDayMoment,
    daysUntilDelivery: daysUntilDelivery,
    formattedDate: formattedDate,
    deliveryToday: isDeliveryToday,
  };
};

export const parseDeliveryDays = (
  numDays: number,
  rawDeliveryDays: string,
  language: string,
  config: PostenCardConfig,
): Array<DeliveryDay> => {
  return rawDeliveryDays
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll("'", '')
    .replaceAll('i dag', '')
    .replaceAll('i morgen', '')
    .replaceAll('.', '')
    .split(',')
    .slice(0, numDays)
    .map((s) => parseDeliveryDay(s.trim(), language, config));
};

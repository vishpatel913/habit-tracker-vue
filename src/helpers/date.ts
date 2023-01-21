import dayjs from "dayjs";
import { SortKey } from "./sort";

const ISO_STRING_FORMAT = "YYYY-MM-DD";

type FormatDateOptions = {
  format?: string;
  dayOffset?: number;
};
export const formatDate = (
  date: Date | string,
  { format = ISO_STRING_FORMAT, dayOffset = 0 }: FormatDateOptions = {}
): string => {
  let day = dayjs(date);
  if (dayOffset) {
    day = day.add(dayOffset, "day");
  }
  return day.format(format);
};

export const sortDateList = (
  dateList: string[],
  order: SortKey = "ASC"
): string[] => {
  const isDescending = order === "DESC";
  const orderedDates = dateList.sort((a, b) => {
    const dateA = dayjs(a);
    const dateB = dayjs(b);
    return isDescending ? dateB.diff(dateA) : dateA.diff(dateB);
  });
  return orderedDates;
};

export const toggleDateInList = (
  dateList: string[],
  date: string
): string[] => {
  const nextDateList = dateList.includes(date)
    ? dateList.filter((d) => date !== d)
    : dateList.concat(date);
  return nextDateList;
};

type LatestStreakOptions = {
  min?: number;
};
export const getLatestDateStreak = (
  dateList: string[],
  { min }: LatestStreakOptions = {}
): string[] => {
  const orderedDates = sortDateList(dateList, "DESC");
  let streakList: string[] = [];
  orderedDates.every((date) => {
    const lastDate = dayjs(streakList[streakList.length - 1]);
    const isNextDateSuccessive = lastDate.diff(date, "day") === 1;
    if (!isNextDateSuccessive && streakList.length >= (min || 1)) return false;
    if (isNextDateSuccessive) {
      streakList.push(date);
    } else {
      streakList = [date];
    }
    return true;
  });
  return streakList;
};

export const getDateList = (startDate: string, endDate: string): string[] => {
  const dates = [];
  const startDay = dayjs(startDate);
  const diff = Math.abs(startDay.diff(endDate, "day"));
  for (let i = 0; i < diff + 1; i++) {
    dates.push(formatDate(startDay.add(i, "day").format()));
  }
  return dates;
};

export const sliceLastDates = (dateList: string[], n: number): string[] => {
  const orderedDates = sortDateList(dateList, "ASC");
  const listLength = dateList.length;
  return orderedDates.slice(listLength - n, listLength);
};

import dayjs from "dayjs";

const ISO_STRING_FORMAT = "YYYY-MM-DD";

export const formatDate = (
  date: Date | string,
  format: string = ISO_STRING_FORMAT
): string => {
  const day = dayjs(date);
  return day.format(format);
};

export const sortDateList = (
  dateList: string[],
  order: "ASC" | "DESC" = "ASC"
): string[] => {
  const orderedDate = dateList.sort();
  if (order === "DESC") {
    return orderedDate.reverse();
  }
  return orderedDate;
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

export const getLastSuccessiveList = (dateList: string[]): string[] => {
  const orderedDates = sortDateList(dateList, "DESC");
  let streakList: string[] = [];
  orderedDates.every((date) => {
    const lastDate = dayjs(streakList[streakList.length - 1]);
    const isNextDateSuccessive = lastDate.diff(date, "day") === 1;
    if (!isNextDateSuccessive && streakList.length > 1) return false;
    if (isNextDateSuccessive) {
      streakList.push(date);
    } else {
      streakList = [date];
    }
    return true;
  });
  return streakList;
};

export const sliceLastDates = (dateList: string[], n: number): string[] => {
  const orderedDates = sortDateList(dateList, "ASC");
  const listLength = dateList.length;
  return orderedDates.slice(listLength - n, listLength);
};

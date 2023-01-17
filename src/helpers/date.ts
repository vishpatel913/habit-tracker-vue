import dayjs from "dayjs";

const ISO_FORMAT = "YYYY-MM-DD";

export const formatDate = (date: Date, format: string = ISO_FORMAT): string => {
  const day = dayjs(date);
  return day.format(format);
};

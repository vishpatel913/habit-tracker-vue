import * as dateHelpers from "@/helpers/date";

describe("date helpers", () => {
  const testDate = new Date(1995, 11, 7);
  const testISOString = "1995-12-07";
  const testLongISOString = "1995-12-07T16:20:00.000Z";
  const calendarFormat = "D/M";

  it("formatDate", () => {
    expect(dateHelpers.formatDate(testDate)).toBe("1995-12-07");
    expect(dateHelpers.formatDate(testISOString)).toBe("1995-12-07");
    expect(dateHelpers.formatDate(testLongISOString)).toBe("1995-12-07");

    expect(dateHelpers.formatDate(testDate, { format: calendarFormat })).toBe(
      "7/12"
    );
    expect(dateHelpers.formatDate(testDate, { dayOffset: 1 })).toBe(
      "1995-12-08"
    );
    expect(dateHelpers.formatDate(testDate, { dayOffset: -1 })).toBe(
      "1995-12-06"
    );
  });

  describe("date list helpers", () => {
    const testDateList = ["2022-04-30", "2021-10-21", "2022-11-09"];
    const testSuccessiveDateList = [
      ...testDateList,
      "2022-11-08",
      "2022-11-07",
      "2022-12-07",
      "2021-10-22",
    ];

    it("sortDateList", () => {
      const expectedOrderedList = ["2021-10-21", "2022-04-30", "2022-11-09"];
      expect(dateHelpers.sortDateList(testDateList)).toEqual(
        expectedOrderedList
      );
      expect(dateHelpers.sortDateList(testDateList, "ASC")).toEqual(
        expectedOrderedList
      );
      expect(dateHelpers.sortDateList(testDateList, "DESC")).toEqual(
        expectedOrderedList.reverse()
      );
    });

    it("toggleDateInList", () => {
      const addingResult = dateHelpers.toggleDateInList(
        testDateList,
        "2022-12-07"
      );
      expect(addingResult).toHaveLength(4);
      expect(addingResult).toContain("2022-12-07");
      const removingResult = dateHelpers.toggleDateInList(
        testDateList,
        "2022-11-09"
      );
      expect(removingResult).toHaveLength(2);
      expect(removingResult).not.toContain("2022-11-09");
    });

    it("getLatestDateStreak", () => {
      const resultWithMinimum = dateHelpers.getLatestDateStreak(
        testSuccessiveDateList,
        { min: 2 }
      );
      expect(resultWithMinimum).toEqual([
        "2022-11-09",
        "2022-11-08",
        "2022-11-07",
      ]);
      const resultNoMinimum = dateHelpers.getLatestDateStreak(
        testSuccessiveDateList
      );
      expect(resultNoMinimum).toEqual(["2022-12-07"]);
    });

    it("sliceLastDates", () => {
      const testList = [
        ...testDateList,
        "2022-05-08",
        "2022-02-16",
        "2022-08-14",
      ];
      expect(dateHelpers.sliceLastDates(testList, 4)).toEqual([
        "2022-04-30",
        "2022-05-08",
        "2022-08-14",
        "2022-11-09",
      ]);
      expect(dateHelpers.sliceLastDates(testList, 2)).toEqual([
        "2022-08-14",
        "2022-11-09",
      ]);
    });
  });
});

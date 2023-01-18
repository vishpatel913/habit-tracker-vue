import * as dateHelpers from "@/helpers/date";

describe("date helpers", () => {
  const testDate = new Date(1995, 11, 7);
  const testISOString = "1995-12-07";
  const calendarFormat = "D/M";

  it("formatDate", () => {
    expect(dateHelpers.formatDate(testDate)).toBe("1995-12-07");
    expect(dateHelpers.formatDate(testDate, calendarFormat)).toBe("7/12");

    expect(dateHelpers.formatDate(testISOString)).toBe("1995-12-07");
    expect(dateHelpers.formatDate(testISOString, calendarFormat)).toBe("7/12");
    expect(dateHelpers.formatDate(testISOString + "T16:20:00.000Z")).toBe(
      "1995-12-07"
    );
  });

  it("valiDateISOString", () => {
    // expect(dateHelpers.valiDateISOString(testISOString)).toBe(testISOString);
    // expect(dateHelpers.valiDateISOString("")).toBe();
  });

  describe("date list helpers", () => {
    const testDateList = ["2022-04-30", "2021-10-21", "2022-11-09"];

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

    it("getLastSuccessiveDates", () => {
      const testList = [
        ...testDateList,
        "2022-11-08",
        "2022-11-07",
        "2022-12-07",
        "2021-10-22",
      ];
      const result = dateHelpers.getLastSuccessiveList(testList);
      expect(result).toEqual(["2022-11-09", "2022-11-08", "2022-11-07"]);
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

import { mapSelectOptions } from "../utils/mapSelectOptions";
export const getYearOptions = (range = 5) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: range * 2 + 1 }, (_, i) => {
    const year = currentYear - range + i;
    return { value: year, label: year };
  });
  return mapSelectOptions(years, "value", "label");
};


export const monthOptions = mapSelectOptions([
  { value: "", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
],'value','label');

export function mapSelectOptions(data, idKey, labelKey) {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    value: item[idKey],
    label: item[labelKey],
  }));
}

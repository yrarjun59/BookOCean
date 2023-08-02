function formateDate(dateTimeString) {
  const datePortion = dateTimeString.substring(0, 10);
  const [year, month, day] = datePortion.split("-");
  const monthName = new Date(datePortion).toLocaleString("en-US", {
    month: "long",
  });
  return `${monthName} ${Number(day)}, ${year}`;
}

export default formateDate;

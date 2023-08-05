// function formateDate(dateTimeString) {
//   const datePortion = dateTimeString.substring(0, 10);
//   const [year, month, day] = datePortion.split("-");
//   const monthName = new Date(datePortion).toLocaleString("en-US", {
//     month: "long",
//   });
//   return `${monthName} ${Number(day)}, ${year}`;
// }

// export default formateDate;

function formateDate(dateTimeString) {
  const dateObject = new Date(dateTimeString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return dateObject.toLocaleString("en-US", options);
}

export default formateDate;

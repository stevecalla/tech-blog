module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // format_date: (date) => {
  //   return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
  //     new Date(date).getFullYear()
  //   }`;
  // },
  // section
  format_date: (date) => {
    let dateFormatted = new Date(date.getFullYear(), date.getMonth(), 
    date.getDate());
    console.log(date.toLocaleDateString(), dateFormatted.toLocaleDateString());
    return dateFormatted.toLocaleDateString();
  },
};

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },

  format_date: (date) => {
    let dateFormatted = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    
    return dateFormatted.toLocaleDateString();
  },

  trim_content: (content) => {
    return content.trim();
  },
};


export const formatSalary = (salary) => {
    if (salary >= 1000) {
      // Divide the salary by 1000 and round to two decimal places
      const formattedSalary = (salary / 1000).toFixed(2);
      return `${formattedSalary}K`;
    } else {
      // If the salary is less than 1000, return it as is
      return salary.toString();
    }
}

export const removeHtmlTags = (input) => {
    // Create a temporary div element
    const div = document.createElement('div');
    
    // Set the HTML content to the input
    div.innerHTML = input;
    
    // Return the text content of the div
    return div.textContent || div.innerText || '';
}

export const todaysDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 16);

    return formattedDate
}

export const formatDateAgo = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
  
    const timeDifference = currentDate - inputDate;
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
  
    if (minutesAgo < 60) {
      return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else if (daysAgo < 30) {
      return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else {
      return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
    }
  }
  
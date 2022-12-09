//Formats date from MM/DD/YYYYY => ex. Dec 8, 2000 or Thurs, Dec 8
export default function formatDate(value, hasYear) {


    if (!value) {
        return null;
    }

    const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const date = new Date(value);

    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    if (hasYear) {
        return `${month} ${day}, ${year}`;
    } else {
        return `${weekday}, ${month} ${day}`;

    }
}
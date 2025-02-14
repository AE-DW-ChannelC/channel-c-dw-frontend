export function getNextMidnightTimestamp() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // Move to the next day
    0,
    0,
    0,
    0 // Set time to 12:00 AM
  );

  return nextMidnight.getTime(); // Get the timestamp in milliseconds
}

export function waitForSeconds(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function truncateString(str, maxLength) {
  if(!str) {
    return '';
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

export function capitalizeFirstLetter(string) {
  return string.replace(/^./, string[0].toUpperCase())
}


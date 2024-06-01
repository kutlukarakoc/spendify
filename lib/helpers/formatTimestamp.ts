export const formatTimestamp = (timestampString: string): string => {
  const timestamp = new Date(parseInt(timestampString) * 1000);
  const day = ("0" + timestamp.getDate()).slice(-2);
  const month = ("0" + (timestamp.getMonth() + 1)).slice(-2);
  const year = timestamp.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

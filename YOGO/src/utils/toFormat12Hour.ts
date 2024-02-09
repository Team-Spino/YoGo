export const toFormat12Hour = ({
  day,
  time,
}: {
  day: string;
  time: string;
}) => {
  const [, hm, meridiem] = new Date(`${day} ${time}`)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .split(' ');
  return `${hm} ${meridiem}`;
};

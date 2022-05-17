export const parseCity = ({ city }: { city: string }): string =>
  city.split('/').pop() as string;

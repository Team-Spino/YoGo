export const parseToSlash = (date: string | Date) =>
  String(date).replace(/-/g, '/');

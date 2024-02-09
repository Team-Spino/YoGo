import uuid from 'react-native-uuid';

export const DAY_OF_WEEK = [
  { key: uuid.v4() as string, name: 'Sun', isSelected: false },
  { key: uuid.v4() as string, name: 'Mon', isSelected: false },
  { key: uuid.v4() as string, name: 'Tue', isSelected: false },
  { key: uuid.v4() as string, name: 'Wed', isSelected: false },
  { key: uuid.v4() as string, name: 'Thu', isSelected: false },
  { key: uuid.v4() as string, name: 'Fri', isSelected: false },
  { key: uuid.v4() as string, name: 'Sat', isSelected: false },
];

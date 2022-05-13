import { openDatabase, enablePromise } from 'react-native-sqlite-storage';
import { DB } from 'utils';

enablePromise(true);

export const connectDB = async () => {
  return openDatabase({ name: DB, location: 'default' });
};

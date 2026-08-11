import { createMMKV } from 'react-native-mmkv';

// MMKV v4(Nitro)부터 `new MMKV()` 대신 createMMKV()로 인스턴스를 만듭니다.
export const storage = createMMKV();

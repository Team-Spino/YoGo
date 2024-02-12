import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from 'types';

export type IHandelScheduleProps = {
    navigation:  NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;
    route: RouteProp<RootStackParamList, 'HandleSchedule'>
  }
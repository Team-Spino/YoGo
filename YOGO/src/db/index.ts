export {
  connectTimezoneDB,
  createTimezoneTable,
  getTimezoneItems,
  insertTimezoneItem,
  deleteTimezoneItem,
  dropTimezoneTable,
} from 'db/timezone';

//   const loadDataCallback = useCallback(async () => {
//     try {
//       const initTodos = [
//         { id: 0, value: 'go to shop' },
//         { id: 1, value: 'eat at least a one healthy foods' },
//         { id: 2, value: 'Do some exercises' },
//       ];
//       const db = await getDBConnection();
//       await createTable(db);
//       const storedTodoItems = await getTodoItems(db);
//       if (storedTodoItems.length) {
//         setTodos(storedTodoItems);
//       } else {
//         await saveTodoItems(db, initTodos);
//         setTodos(initTodos);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

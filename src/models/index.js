// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserInfo, TodoListItems } = initSchema(schema);

export {
  UserInfo,
  TodoListItems
};
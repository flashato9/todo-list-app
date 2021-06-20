import { ModelInit, MutableModel } from '@aws-amplify/datastore';

export declare class UserInfo {
  readonly id: string;
  readonly user_id?: string;
  readonly user_password?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserInfo>);
  static copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo>) => MutableModel<UserInfo> | void): UserInfo;
}

export declare class TodoListItems {
  readonly id: string;
  readonly user_id?: string;
  readonly order_number?: number;
  readonly title: string;
  readonly description?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TodoListItems>);
  static copyOf(
    source: TodoListItems,
    mutator: (draft: MutableModel<TodoListItems>) => MutableModel<TodoListItems> | void
  ): TodoListItems;
}

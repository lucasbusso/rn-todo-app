export interface Todo {
  id: string;
  title: string;
  user_id: string;
  get_shared_with: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

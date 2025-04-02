export interface Task {
    _id: string;
    description: string;
    date: string;
    status: string;
    user: string;
  }

export interface CrudTask {
  description: string;
  date: string;
}
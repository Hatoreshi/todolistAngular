
export interface ITask {
    _id: string;
    title: string;
    status: boolean;
};

export type Task = Omit<ITask, '_id'>;
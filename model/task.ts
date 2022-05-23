import {Dispatch} from 'react';
import { AppActions } from '../store/actions';

export interface Task {
    _id: string,
    summary: string,
    dateCreated: Date,
    isComplete: boolean,
    sortIndex: number,
}

export interface TaskComponents {
    tasks: Task[];
    dispatch: Dispatch<AppActions>
}
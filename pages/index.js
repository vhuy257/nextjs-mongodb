import { createContext, useReducer, useEffect } from 'react';
import clientPromise from '../lib/mongodb';
import ListTask from '../components/Tasks/ListTask';
import AddTask from '../components/Tasks/InsertTask';
import Layout from '../components/Layout/Layout';
import { LoadAllTasksService } from '../services/TaskService';
import reducer, { initialState } from '../store/reducer';
import {
  getAllTasks
} from '../store/actions';
import Head from 'next/head';
export const AppContext = createContext(initialState);

export default function Home({ isConnected }) {
  const [{tasks, condition}, dispatch] = useReducer(reducer, initialState);

  useEffect(async () => {
    const res = await LoadAllTasksService();
    dispatch(getAllTasks(res.data));
  }, [])

  return (
    <AppContext.Provider
      value={{
        tasks,
        dispatch
      }}
    >
      <Layout>
        <Head>
            <title>List task management</title>
        </Head>
        <div className="task__wrapper">
            <AddTask/>
            <ListTask tasks={tasks} condition={condition}/>
        </div>
      </Layout>
    </AppContext.Provider>
  )
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

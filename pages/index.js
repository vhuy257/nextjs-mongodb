import { createContext, useReducer, useEffect } from 'react';
import clientPromise from '../lib/mongodb';
import TaskDragDropWrapper from '../components/Tasks/TaskDragDropWrapper';
import InsertTask from '../components/Tasks/InsertTask';
import SearchTask from '../components/Tasks/SearchTask';
import Layout from '../components/Layout/Layout';
import { LoadAllTasksService } from '../services/TaskService';
import reducer, { initialState } from '../store/reducer';
import {
  gql
} from '@apollo/client';
import client from '../apollo-client';
import {
  getAllTasks
} from '../store/actions';
import Head from 'next/head';
export const AppContext = createContext(initialState);

export default function Home({ countries }) {
  const [{tasks, condition, selectedItemId}, dispatch] = useReducer(reducer, initialState);  
  
  useEffect( async() => {
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
              <title>List task management </title>
          </Head>
          <div className="task__wrapper">
              {console.log(countries)}
              <InsertTask/>
              <SearchTask/>
              <TaskDragDropWrapper tasks={tasks} condition={condition} selectedItemId={selectedItemId}/>
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
    
    const { data } = await client.query({
      query: gql`
        query Countries {
          countries {
            code
            name
            emoji
          }
        }
      `,
    });
  
    return {
      props: {
        countries: data.countries.slice(0, 4),
      },
    };
    
    // return {
    //   props: { isConnected: true,},
    // }
  } catch (e) {
    console.log(e);
    return {
      props: { isConnected: false },
    }
  }
}

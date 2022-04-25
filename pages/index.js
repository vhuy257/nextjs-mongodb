import clientPromise from '../lib/mongodb'
import ListTask from '../components/tasks/ListTask';
import AddTask from '../components/tasks/InsertTask';
import Layout from '../components/layout';

export default function Home({ isConnected }) {
  return (
    <Layout>
      <div className="task__wrapper">
          <AddTask/>
          <ListTask/>
      </div>
    </Layout>
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

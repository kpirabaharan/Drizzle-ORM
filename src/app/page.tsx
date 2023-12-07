import { db } from '@/db';
import { users } from '@/db/schema';

const Home = async () => {
  // GET ALL USERS
  const result = await db.select().from(users);

  return <div>{JSON.stringify(result)}</div>;
};

export default Home;

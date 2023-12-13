import { db } from '@/db';
import { categories, postToCategories, posts, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = async () => {
  // Returning chain = return the specified fields of the inserted rows, empty = all
  const newUsers = await db
    .insert(users)
    .values({
      fullName: 'John Doe',
      address: '123 Main St',
      phone: '555-555-5555',
      score: 100,
    })
    .returning({ userId: users.id });

  const userId = newUsers[0].userId;

  const newCategories = await db
    .insert(categories)
    .values([
      {
        name: 'category 1',
      },
      { name: 'category 2' },
    ])
    .returning({ catId: categories.id });

  const newPosts = await db
    .insert(posts)
    .values([
      { authorId: userId, text: 'post 1' },
      { authorId: userId, text: 'post 2' },
    ])
    .returning({ postId: posts.id });

  await db
    .insert(postToCategories)
    .values([
      { postId: newPosts[0].postId, categoryId: newCategories[0].catId },
      { postId: newPosts[0].postId, categoryId: newCategories[1].catId },
      { postId: newPosts[1].postId, categoryId: newCategories[0].catId },
      { postId: newPosts[1].postId, categoryId: newCategories[1].catId },
    ])
    .execute();

  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: {
        with: {
          postCategories: {
            columns: {},
            with: { category: { columns: { name: true } } },
          },
        },
      },
    },
  });

  return NextResponse.json(result);
};

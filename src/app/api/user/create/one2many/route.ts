import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { posts, users } from '@/db/schema';

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

  ['post 1', 'post 2'].forEach(
    async post =>
      await db.insert(posts).values({ text: post, authorId: userId }).execute(),
  );

  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: true,
    },
  });

  return NextResponse.json(result);
};

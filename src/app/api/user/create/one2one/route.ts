import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { profiles, users } from '@/db/schema';

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

  // Execute chain = no return field
  await db
    .insert(profiles)
    .values({
      bio: 'I am a person',
      userId: newUsers[0].userId,
    })
    .execute();

  const result = await db.query.users.findFirst({
    where: eq(users.id, newUsers[0].userId),
    with: {
      profile: true,
    },
  });

  return NextResponse.json(result);
};

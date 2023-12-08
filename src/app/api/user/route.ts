import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const result = await db.select().from(users).where(eq(users.id, 1)).execute();

  return NextResponse.json(result);
};

import { db } from '@/db';
import { users } from '@/db/schema';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const newUsers = await db
    .insert(users)
    .values({
      fullName: 'John Doe',
      address: '123 Main St',
      phone: '555-555-5555',
      score: 100,
    })
    .returning();

  return NextResponse.json(newUsers);
};

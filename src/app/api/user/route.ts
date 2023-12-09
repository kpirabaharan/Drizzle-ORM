import { db } from '@/db';
import { users } from '@/db/schema';
import { and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const result = await db
    .select()
    .from(users)
    .where(and(users.score, 95))
    .execute();

  return NextResponse.json(result);
};

// eq = equal
// ne = not equal
// gt = greater than
// lt = less than
// gte = greater than or =
// lte = less than or =
// isNull = if field is null
// isNotNull = if field is not null
// inArray. = if field matches one of the array elements ex. isArray(user.id, [1,2,3,4])
// notInArray = …
// between = between two values ex. between(user.score 50, 90)
// notBetween = …
// like = regex like search string (case sensitive)
// ilike = ^ (case insensitive)
// notLike = …
// notILike = …
// and = Combine a list of conditions -> Nest with or
// or = Logical or                    -> Nest with and

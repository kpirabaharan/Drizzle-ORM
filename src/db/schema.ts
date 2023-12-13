import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  address: varchar('address', { length: 256 }),
  score: integer('score'),
});

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  posts: many(posts),
}));

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  bio: varchar('bio', { length: 256 }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  text: varchar('text', { length: 256 }),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  postCategories: many(postToCategories),
}));

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  posts: many(postToCategories),
}));

export const postToCategories = pgTable(
  'post_to_categories',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
  },
  t => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] }),
  }),
);

export const postOnCategoryRelations = relations(
  postToCategories,
  ({ one }) => ({
    post: one(posts, {
      fields: [postToCategories.postId],
      references: [posts.id],
    }),
    category: one(categories, {
      fields: [postToCategories.categoryId],
      references: [categories.id],
    }),
  }),
);

// const ints = pgTable('ints', {
//   qty: smallint('qty'),
//   test2: bigint('test2', { mode: 'number' }),
//   test1: bigint('test1', { mode: 'bigint' }),
// });

// const ids = pgTable('ids', {
//   id: serial('id').primaryKey(),
//   id1: smallserial('id1').primaryKey(),
//   id2: bigserial('id2', { mode: 'number' }).primaryKey(),
//   id3: bigserial('id3', { mode: 'bigint' }).primaryKey(),
// });

// const decimals = pgTable('decimals', {
//   price: decimal('price', { precision: 7, scale: 2 }), // Ex. 12345.67
//   price2: numeric('price2', { precision: 7, scale: 2 }), // Ex. 12345.67
// });

// const floats = pgTable('floats', {
//   num: real('score'),
// });

// const doubles = pgTable('doubles', {
//   num: doublePrecision('score'),
// });

// const bools = pgTable('boolean', {
//   isTrue: boolean('is_true'),
// });

// const texts = pgTable('texts', {
//   name: text('name'),
// });

// const varchars = pgTable('varchars', {
//   name: varchar('name', { length: 256 }),
// });

// const chars = pgTable('chars', {
//   name: char('name', { length: 10 }), // Ex. "chair     "
// });

// const jsons = pgTable('json', {
//   data: json('data'),
//   data2: jsonb('data2'),
// });

// const datetimes = pgTable('date_times', {
//   startAt: time('start_at', { precision: 6, withTimezone: true }).defaultNow(),
//   date: timestamp('date', { precision: 6, withTimezone: true }).defaultNow(),
//   date2: date('date2').defaultNow(),
//   inter: interval('inter'),
// });

// const moodEnum = pgEnum('mood', ['sad', 'ok', 'happy']);

// const enums = pgTable('enums', {
//   mood: moodEnum('mood').notNull(),
// });

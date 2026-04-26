import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
    id: uuid('id').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    author: text('author'),
    category: text('category').default('BREAKING').notNull(),
    image: text('image'),
    slug: text('slug').unique(),
});

export const characters = pgTable('characters', {
    id: uuid('id').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    name: text('name').notNull(),
    realName: text('real_name'),
    role: text('role'),
    description: text('description'),
    image: text('image'),
    emoji: text('emoji'),
    color: text('color'),
    faction: text('faction'),
});

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
});

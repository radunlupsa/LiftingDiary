import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Exercise Templates - reusable exercise library per user
export const exerciseTemplates = pgTable('exercise_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  category: text('category'),
  isTimeBased: boolean('is_time_based').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Workouts - individual workout sessions
export const workouts = pgTable('workouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name'),
  date: timestamp('date').defaultNow().notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Exercises - exercises within a workout
export const exercises = pgTable('exercises', {
  id: uuid('id').defaultRandom().primaryKey(),
  workoutId: uuid('workout_id')
    .notNull()
    .references(() => workouts.id, { onDelete: 'cascade' }),
  templateId: uuid('template_id').references(() => exerciseTemplates.id, {
    onDelete: 'set null',
  }),
  name: text('name').notNull(),
  order: integer('order').notNull(),
  notes: text('notes'),
});

// Sets - individual sets within an exercise
export const sets = pgTable('sets', {
  id: uuid('id').defaultRandom().primaryKey(),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id, { onDelete: 'cascade' }),
  setNumber: integer('set_number').notNull(),
  reps: integer('reps'),
  weight: decimal('weight', { precision: 6, scale: 2 }),
  weightUnit: text('weight_unit').default('kg').notNull(),
  duration: integer('duration'),
  rpe: decimal('rpe', { precision: 3, scale: 1 }),
  notes: text('notes'),
  completed: boolean('completed').default(true).notNull(),
});

// Relations
export const exerciseTemplatesRelations = relations(
  exerciseTemplates,
  ({ many }) => ({
    exercises: many(exercises),
  })
);

export const workoutsRelations = relations(workouts, ({ many }) => ({
  exercises: many(exercises),
}));

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [exercises.workoutId],
    references: [workouts.id],
  }),
  template: one(exerciseTemplates, {
    fields: [exercises.templateId],
    references: [exerciseTemplates.id],
  }),
  sets: many(sets),
}));

export const setsRelations = relations(sets, ({ one }) => ({
  exercise: one(exercises, {
    fields: [sets.exerciseId],
    references: [exercises.id],
  }),
}));


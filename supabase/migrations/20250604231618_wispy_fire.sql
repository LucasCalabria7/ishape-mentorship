/*
  # Create iShape Database Schema

  1. New Tables
    - user_profile: Stores user fitness information and preferences
    - user_progress: Daily tracking of workouts, nutrition, and water intake
    - workout_plan: User's workout plans
    - exercise: Individual exercises within workout plans
    - meal_plan: User's meal plans with nutritional totals
    - food_item: Individual food items within meal plans
    - iris_log: AI interaction history

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Cascade deletes for related records
*/

-- User Profile Table
CREATE TABLE IF NOT EXISTS user_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE,
  age integer,
  height numeric(5,2),
  weight numeric(5,2),
  gender text CHECK (gender IN ('male', 'female', 'other')),
  fitness_level text CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  goal text CHECK (goal IN ('weight_loss', 'muscle_gain', 'maintenance', 'strength')),
  training_location text CHECK (training_location IN ('home', 'gym', 'hybrid')),
  daily_calories integer,
  target_weight numeric(5,2),
  water_target integer,
  total_workout_days integer DEFAULT 0,
  role text DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  date date DEFAULT CURRENT_DATE,
  workout_completed boolean DEFAULT false,
  water_consumed_ml integer DEFAULT 0,
  protein_g numeric(6,2) DEFAULT 0,
  carbs_g numeric(6,2) DEFAULT 0,
  fat_g numeric(6,2) DEFAULT 0,
  calories_consumed integer DEFAULT 0,
  workout_progress numeric(5,2) DEFAULT 0,
  diet_progress numeric(5,2) DEFAULT 0,
  water_progress numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Workout Plan Table
CREATE TABLE IF NOT EXISTS workout_plan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exercise Table
CREATE TABLE IF NOT EXISTS exercise (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_plan_id uuid REFERENCES workout_plan(id) ON DELETE CASCADE,
  name text NOT NULL,
  weight text,
  sets integer NOT NULL,
  reps integer NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Meal Plan Table
CREATE TABLE IF NOT EXISTS meal_plan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  image_url text,
  total_protein numeric(6,2) DEFAULT 0,
  total_carbs numeric(6,2) DEFAULT 0,
  total_fat numeric(6,2) DEFAULT 0,
  total_calories integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Food Item Table
CREATE TABLE IF NOT EXISTS food_item (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id uuid REFERENCES meal_plan(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity numeric(6,2) NOT NULL,
  unit text NOT NULL CHECK (unit IN ('g', 'ml', 'unit')),
  protein numeric(6,2) DEFAULT 0,
  carbs numeric(6,2) DEFAULT 0,
  fat numeric(6,2) DEFAULT 0,
  calories integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Iris Log Table
CREATE TABLE IF NOT EXISTS iris_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE iris_log ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can manage their own profile"
  ON user_profile
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage their own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own workout plans"
  ON workout_plan
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage exercises in their workout plans"
  ON exercise
  FOR ALL
  TO authenticated
  USING (
    workout_plan_id IN (
      SELECT id FROM workout_plan WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    workout_plan_id IN (
      SELECT id FROM workout_plan WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own meal plans"
  ON meal_plan
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage food items in their meal plans"
  ON food_item
  FOR ALL
  TO authenticated
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plan WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    meal_plan_id IN (
      SELECT id FROM meal_plan WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own iris logs"
  ON iris_log
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profile_updated_at
  BEFORE UPDATE ON user_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_plan_updated_at
  BEFORE UPDATE ON workout_plan
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plan_updated_at
  BEFORE UPDATE ON meal_plan
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
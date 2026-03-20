export type BodyPart = 'shoulder' | 'back' | 'chest' | 'arms' | 'legs' | 'core' | 'fullbody' | 'stretching';
export type Position = 'floor' | 'seated' | 'standing'; // for orthostatic hypotension ordering
export type WarningLevel = 'warning' | 'caution' | 'info';

export interface FormCue {
  type: 'do' | 'dont';
  text: string; // Korean
}

export interface Exercise {
  slug: string;
  name: string; // Korean primary name
  nameEn: string; // English name for search
  bodyPart: BodyPart;
  position: Position;
  setup: string; // 2-second design: setup description
  keyCues: string[]; // top 3 form cues (Korean)
  commonMistakes: string[]; // most common mistakes (Korean)
  formCues: FormCue[]; // detailed do/don't list
  warningLevel?: WarningLevel;
  warningNote?: string; // health warning if any (Korean)
  sessionIds: number[]; // which sessions covered this exercise
  mediaIds: string[]; // reserved for future media (empty for now)
  notes?: string; // additional trainer notes
}

export interface SessionExercise {
  slug: string;
  sets?: string;
  reps?: string;
  notes?: string;
}

export interface Session {
  id: number;
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g. "2025년 12월 9일"
  sessionNumber: number; // 1-24
  focus: string; // Korean session theme
  exercises: SessionExercise[];
  trainerNotes: string; // raw trainer message (Korean)
  isIncomplete?: boolean; // true if message was truncated
}

export interface HealthProfile {
  conditions: HealthCondition[];
  nutritionRestrictions: NutritionRestriction[];
  rhabdomyolysisSymptoms: string[]; // 횡문근융해증 증상 체크리스트
  goals: string[];
  background: string;
}

export interface HealthCondition {
  name: string;
  detail: string;
  severity: 'critical' | 'moderate' | 'mild';
}

export interface NutritionRestriction {
  category: string;
  items: string[];
  reason: string;
}

export interface Principle {
  id: number;
  title: string; // Korean short title
  detail: string; // Korean explanation
  icon?: string; // emoji
}

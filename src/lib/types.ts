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

export const bodyPartLabels: Record<BodyPart, string> = {
  shoulder: '어깨',
  back: '등',
  chest: '가슴',
  arms: '팔',
  legs: '하체',
  core: '코어',
  fullbody: '전신',
  stretching: '스트레칭',
};

export const bodyPartColors: Record<BodyPart, string> = {
  shoulder: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  back: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  chest: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  arms: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  legs: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  core: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  fullbody: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  stretching: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
};

export const positionLabels: Record<Position, string> = {
  floor: '바닥',
  seated: '앉기',
  standing: '서기',
};

export const warningIcons: Record<WarningLevel, string> = {
  warning: '🔴',
  caution: '🟡',
  info: '🔵',
};

export const warningBg: Record<WarningLevel, string> = {
  warning: 'bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200',
  caution: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200',
};

export const exerciseImages: Record<string, string> = {
  'lateral-raise': '/exercises/lateral-raise-v2.png',
  'shoulder-press': '/exercises/shoulder-press-v2.png',
  'reverse-fly': '/exercises/reverse-fly-new.png',
  't-raise': '/exercises/t-raise-new.png',
  'lat-pulldown': '/exercises/lat-pulldown-v2.png',
  'one-arm-dumbbell-row': '/exercises/one-arm-dumbbell-row-v2.png',
  't-bar-row': '/exercises/t-bar-row-new.png',
  'inverted-row': '/exercises/inverted-row-new.png',
  'incline-row': '/exercises/incline-row-new.png',
  'superman-row': '/exercises/superman-row-new.png',
  'bench-press': '/exercises/bench-press-v2.png',
  'incline-bench-press': '/exercises/incline-bench-press-new.png',
  'chest-press': '/exercises/chest-press-new.png',
  'push-up': '/exercises/push-up-v2.png',
  'dumbbell-pullover': '/exercises/dumbbell-pullover-new.png',
  'hammer-curl': '/exercises/hammer-curl-v2.png',
  'ez-bar-curl': '/exercises/ez-bar-curl-new.png',
  'lying-tricep-extension': '/exercises/lying-tricep-extension-new.png',
  'dips': '/exercises/dips-new.png',
  'deadlift': '/exercises/deadlift-v2.png',
  'goblet-squat': '/exercises/goblet-squat-v2.png',
  'calf-raise': '/exercises/calf-raise-new.png',
  'leg-extension-curl': '/exercises/leg-extension-curl-new.png',
  'hip-bridge': '/exercises/hip-bridge-v2.png',
  'hip-abduction-gluteus': '/exercises/hip-abduction-gluteus-new.png',
  'kettlebell-swing': '/exercises/kettlebell-swing-v2.png',
  'burpee': '/exercises/burpee-new.png',
  'plank': '/exercises/plank-v2.png',
  'back-extension': '/exercises/back-extension-new.png',
  'leg-raise': '/exercises/leg-raise-new.png',
  'lower-body-stretch': '/exercises/lower-body-stretch-new.png',
  'foam-rolling': '/exercises/foam-rolling-new.png',
};

export const bodyPartIcons: Record<string, string> = {
  shoulder: '/exercises/icon-shoulder.png',
  back: '/exercises/icon-back.png',
  chest: '/exercises/icon-chest.png',
  arms: '/exercises/icon-arms.png',
  legs: '/exercises/icon-legs.png',
  core: '/exercises/icon-core.png',
};

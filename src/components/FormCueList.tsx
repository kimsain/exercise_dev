import type { FormCue } from '@/lib/types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  cues: FormCue[];
}

export default function FormCueList({ cues }: Props) {
  const doItems = cues.filter((c) => c.type === 'do');
  const dontItems = cues.filter((c) => c.type === 'dont');

  return (
    <div className="space-y-3">
      {doItems.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide mb-1.5">
            해야 할 것
          </h4>
          <ul className="space-y-1.5">
            {doItems.map((cue, i) => (
              <li
                key={i}
                className="flex items-start gap-2 bg-green-50 dark:bg-green-950 rounded-lg px-3 py-2"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-800 dark:text-green-200">{cue.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {dontItems.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1.5">
            하지 말 것
          </h4>
          <ul className="space-y-1.5">
            {dontItems.map((cue, i) => (
              <li
                key={i}
                className="flex items-start gap-2 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-2"
              >
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-800 dark:text-red-200">{cue.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

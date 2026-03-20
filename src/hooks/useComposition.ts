import { useRef, useCallback } from 'react';

/**
 * Handles Korean (and other CJK) IME composition to prevent premature Enter/Escape
 * triggers during character composition.
 *
 * Safari fires compositionend before keyup, Chrome/Firefox after. The isComposing
 * flag on the event is unreliable cross-browser, so we track it manually.
 */
export function useComposition() {
  const composingRef = useRef(false);

  const onCompositionStart = useCallback(() => {
    composingRef.current = true;
  }, []);

  const onCompositionEnd = useCallback(() => {
    // Safari fires compositionend before keyup — use setTimeout to let keyup fire first
    setTimeout(() => {
      composingRef.current = false;
    }, 0);
  }, []);

  const isComposing = useCallback(() => composingRef.current, []);

  return { onCompositionStart, onCompositionEnd, isComposing };
}

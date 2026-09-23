/** Stand-in for `storybook/test`: the explorer replaces event args with its own recorders. */
export function fn(): (...args: unknown[]) => void {
  return () => undefined;
}

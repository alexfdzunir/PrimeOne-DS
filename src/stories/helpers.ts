/**
 * `[input]="arg"` bindings for the args that currently have a value,
 * so controls left unset keep the component defaults.
 */
export function bind(args: Record<string, unknown>, inputs: readonly string[]): string {
  return inputs
    .filter((name) => args[name] !== undefined)
    .map((name) => ` [${name}]="${name}"`)
    .join('');
}

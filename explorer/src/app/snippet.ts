import { formatTemplate } from './code/format-template';
import { formatTs } from './code/format-ts';
import type { Line } from './code/tokens';
import type { ComponentEntry, RenderedStory } from './model';

/**
 * Copyable code of the component in its current state: the story template with the control values
 * resolved (see `formatTemplate`) and the standalone component that uses it (see `formatTs`).
 */
export function htmlSnippet(entry: ComponentEntry, story: RenderedStory, args: Record<string, unknown>): Line[] {
  return formatTemplate(story.template, {
    args,
    controls: new Set(entry.controls.map((control) => control.name)),
    events: new Set(entry.events.map((event) => event.name)),
    props: story.props,
    defaults: new Map(
      entry.controls.filter((control) => control.defaultSummary !== undefined).map((control) => [control.name, control.defaultSummary as string]),
    ),
  });
}

export function tsSnippet(entry: ComponentEntry): Line[] {
  return formatTs(entry);
}

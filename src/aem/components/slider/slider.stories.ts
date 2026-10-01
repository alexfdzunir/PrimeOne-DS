import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode } from '../../stories/helpers';

interface Args {
  label: string;
  min: number;
  max: number;
  value: number;
  step: number;
  disabled: boolean;
}

let seq = 0;

const meta: Meta = {
  title: 'AEM/Inputs/Slider',
  parameters: {
    figmaUrl: figmaNode('16960:12445'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Disabled'],
    docs: { description: { component: 'Deslizador con la pregunta, mínimo y máximo y el valor en una burbuja sobre el cursor. `input type="range"` nativo; `slider.js` mueve la burbuja.' } },
  },
  args: { label: 'Indica la nota media de tu expediente', min: 5, max: 10, value: 8, step: 0.5, disabled: false },
  argTypes: {
    label: { control: 'text', description: 'Pregunta.' },
    min: { control: 'number' },
    max: { control: 'number' },
    value: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  render: (raw) => {
    const args = raw as Args;
    const id = `aem-slider-${++seq}`;
    const pct = ((args.value - args.min) / (args.max - args.min)) * 100;
    return {
      template: `<div class="${cx('aem-slider', args.disabled && 'aem-slider--disabled')}" style="--aem-slider-pct: ${pct}%; max-width: 41rem">
  <label class="aem-slider__label" for="${id}">${args.label}</label>
  <div class="aem-slider__scale" aria-hidden="true">
    <span>${args.min}</span>
    <span class="aem-slider__bubble">${args.value}</span>
    <span>${args.max}</span>
  </div>
  <input ${attrs({ class: 'aem-slider__input', id, type: 'range', min: args.min, max: args.max, step: args.step, value: args.value, disabled: args.disabled })} />
</div>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };

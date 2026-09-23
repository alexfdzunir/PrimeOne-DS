import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PrimeOneQuestion } from './question';
import type { QuestionOption } from './question';
import { bind } from '../../stories/helpers';

const INPUTS = ['statement', 'number', 'type', 'state', 'feedbackTitle', 'feedback', 'role', 'placeholder', 'mobile'];
const OPTIONS: QuestionOption[] = [
  { value: 'a', label: '2' },
  { value: 'b', label: '4', correct: true },
  { value: 'c', label: '8' },
];

const meta: Meta = {
  title: 'Proeduca/Question',
  decorators: [moduleMetadata({ imports: [PrimeOneQuestion] })],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    statement: '¿Cuál es la dimensión del espacio de matrices 2x2?',
    number: 1,
    type: 'single',
    state: 'default',
    feedbackTitle: 'Explicación',
    feedback: 'Una base está formada por las 4 matrices elementales.',
    regenerate: fn(),
    edit: fn(),
    favorite: fn(),
    remove: fn(),
  },
  argTypes: {
    statement: { control: 'text' },
    number: { control: 'number' },
    type: { control: 'inline-radio', options: ['multiple', 'single', 'text'], table: { defaultValue: { summary: 'multiple' } } },
    state: { control: 'select', options: ['corrected', 'default', 'error', 'success', 'unanswered'], table: { defaultValue: { summary: 'default' } } },
    feedbackTitle: { control: 'text' },
    feedback: { control: 'text' },
    role: { control: 'inline-radio', options: [undefined, 'student', 'teacher'], table: { defaultValue: { summary: 'student' } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Escribe tu respuesta' } } },
    mobile: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    regenerate: { action: 'regenerate', table: { category: 'Eventos' } },
    edit: { action: 'edit', table: { category: 'Eventos' } },
    favorite: { action: 'favorite', table: { category: 'Eventos' } },
    remove: { action: 'remove', table: { category: 'Eventos' } },
  },
  render: (args) => ({
    props: { ...args, options: OPTIONS, answer: null },
    template: `<prime-one-question [options]="options" [(answer)]="answer"${bind(args, INPUTS)} (regenerate)="regenerate($event)" (edit)="edit($event)" (favorite)="favorite($event)" (remove)="remove($event)" />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Multiple: Story = { args: { type: 'multiple' } };
export const Text: Story = { args: { type: 'text' } };
export const Corrected: Story = { args: { state: 'corrected' } };
export const Error: Story = { args: { state: 'error' } };
export const Teacher: Story = { args: { role: 'teacher' } };

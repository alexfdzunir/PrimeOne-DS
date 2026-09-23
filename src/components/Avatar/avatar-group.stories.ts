import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { PORTRAITS } from '../../stories/data';

const meta: Meta = {
  title: 'Misc/AvatarGroup',
  decorators: [moduleMetadata({ imports: [Avatar, AvatarGroup] })],
  parameters: {
    controls: { expanded: true },
    storyOrder: ['Default', 'Normal', 'XLarge'],
  },
  args: {
    size: 'large',
    extra: '+5',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['normal', 'large', 'xlarge'] },
    extra: { control: 'text' },
  },
  render: (args) => ({
    props: { ...args, people: PORTRAITS },
    template: `
      <p-avatargroup>
        @for (photo of people; track $index) {
          <p-avatar [image]="photo" [size]="size" shape="circle" />
        }
        <p-avatar [label]="extra" [size]="size" shape="circle" />
      </p-avatargroup>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Normal: Story = { args: { size: 'normal' } };
export const XLarge: Story = { args: { size: 'xlarge' } };

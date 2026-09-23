import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

const meta: Meta = {
  title: 'Misc/AvatarGroup',
  decorators: [moduleMetadata({ imports: [Avatar, AvatarGroup] })],
  parameters: {
    controls: { expanded: true },
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
    props: { ...args, people: ['AF', 'LM', 'JR', 'MS'] },
    template: `
      <p-avatargroup>
        @for (person of people; track person) {
          <p-avatar [label]="person" [size]="size" shape="circle" />
        }
        <p-avatar [label]="extra" [size]="size" shape="circle" />
      </p-avatargroup>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

import { Button } from './Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    classes: {
      options: ['primary-btn', 'secondary-btn'], //removing filled button from here because this is the default, if you want outlined you should add the class 'outline' and pass a color
      control: { type: 'radio' },
    },
    content: {
      type: 'string' as any,
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  render: args => <Button content="Read more" {...args} />,
}

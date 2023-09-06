import { Hero } from './Hero'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Hero> = {
  component: Hero,
}

export default meta
type Story = StoryObj<typeof Hero>

export const Home: Story = {
  args: {
    attributes: {
      data: {
        background_image_position: 'center',
        hero_design: 'home',
        background_color: '#000',
        background_image: '',
        cta_button_label: 'Read more',
        cta_button_link: '',
        heading: 'Lorem ipsum dolor sit amet',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.',
      },
    },
  },
}

export const Landing: Story = {
  args: {
    attributes: {
      data: {
        background_image_position: 'center',
        hero_design: 'landing',
        background_color: '#000',
        background_image: '',
        cta_button_label: 'Read more',
        cta_button_link: '',
        heading: 'Lorem ipsum dolor sit amet',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.',
      },
    },
  },
}

export const Default: Story = {
  args: {
    attributes: {
      data: {
        background_image_position: 'center',
        hero_design: 'default',
        background_color: '#000',
        background_image: '',
        cta_button_label: 'Read more',
        cta_button_link: '',
        heading: 'Lorem ipsum dolor sit amet',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.',
      },
    },
  },
}

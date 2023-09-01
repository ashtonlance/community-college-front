import { Header } from "./Header";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    menuItems: {
      nodes: [
        {
          id: "1",
          label: "Home",
          url: "/",
          childItems: {
            nodes: [
              {
                id: "2",
                label: "About",
                url: "/about",
              },
              { id: "3", label: "Contact", url: "/contact" },
            ],
          },
        },
        { id: "4", label: "Blog", url: "/blog" },
        { id: "5", label: "Shop", url: "/shop" },
      ],
    },
    form: {
      id: "1",
      formId: "1",
      formFields: {
        nodes: [
          {
            id: "1",
            label: "Name",
            name: "name",
            type: "text",
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      options: ["default", "transparent"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  render: (args) => <Header {...args} />,
};

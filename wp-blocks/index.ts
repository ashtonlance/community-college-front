import { Columns } from '../components/Columns'
import { Pullquote } from '../components/Pullquote'
import { Separator } from '../components/Separator'
import { Button } from '../components/Button'
import { Buttons } from '../components/Buttons'
import { Heading } from '../components/Heading'
import { Paragraph } from '../components/Paragraph'
import { List } from '../components/List'
import { Hero } from '../components/Hero'
import Image from '../components/Image'
import { Gallery } from '../components/Gallery'
import { Video } from '../components/Video'
import { Table } from '../components/Table'
import { Quote } from '../components/Quote'
import { Shortcode } from '../components/Shortcode'
import { TextBlock } from '../components/TextBlock'
import { TextAndImageBlock } from '../components/TextAndImageBlock'
import { TextAndMediaSlider } from '../components/TextAndMediaSlider'
import { LinksBlock } from '../components/LinksBlock'
import { StatsBlock } from '../components/StatsBlock'
import { Testimonial } from '../components/Testimonial'
import { CTABanner } from '../components/CTABanner'
import { GeneralCards } from '../components/GeneralCards'
import { FeaturesAndBenefits } from '../components/FeaturesAndBenefits'
import { RelatedResources } from '../components/RelatedResources'
import { ContactBlock } from '../components/ContactBlock'
import { TestimonialSlider } from '../components/TestimonialSlider'
import { PageHeading } from '../components/PageHeading'
import { WYSIWYG } from '../components/WYSIWYG'
import { Form } from '../components/Form'
import { MediaEmbed } from '../components/MediaEmbed'
import { Location } from '../components/Location'
import { AccordionDisplay } from '@/components/Accordion'
import { EventCards } from '@/components/EventCards'

type WordPressBlock = React.FC & {
  displayName?: string
  name?: string
  config?: {
    name: string
  }
}

const blocks = {
  Columns,
  Pullquote,
  Separator,
  Buttons,
  Button,
  Heading,
  Paragraph,
  Image,
  Hero,
  TextBlock,
  StatsBlock,
  Testimonial,
  LinksBlock,
  CTABanner,
  GeneralCards,
  RelatedResources,
  TextAndImageBlock,
  TextAndMediaSlider,
  ContactBlock,
  FeaturesAndBenefits,
  TestimonialSlider,
  List,
  Shortcode,
  Video,
  Gallery,
  Quote,
  Table,
  PageHeading,
  WYSIWYG,
  Form,
  MediaEmbed,
  Location,
  AccordionDisplay,
  EventCards,
}

export default blocks

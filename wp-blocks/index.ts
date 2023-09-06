import { DynamicNavigationMenu } from '../components/Header'
import { Columns } from '../components/Columns'
import { Pullquote } from '../components/Pullquote'
import { Separator } from '../components/Separator'
import { Button } from '../components/Button'
import { Buttons } from '../components/Buttons'
import { Heading } from '../components/Heading'
import { Paragraph } from '../components/Paragraph'
import { List } from '../components/List'
import { Hero } from '../components/Hero'
import { EventHero } from '../components/Hero/EventHero'
import Image from '../components/Image'
import { Gallery } from '../components/Gallery'
import { Video } from '../components/Video'
import { Table } from '../components/Table'
import { Quote } from '../components/Quote'
import { Shortcode } from '../components/Shortcode'
import { TextBlock } from '../components/TextBlock'
import { TextAndImageBlock } from '../components/TextAndImageBlock'
import { LinksBlock } from '../components/LinksBlock'
import { StatsBlock } from '../components/StatsBlock'
import { Testimonial } from '../components/Testimonial'
import { CTABanner } from '../components/CTABanner'
import { GeneralCards } from '../components/GeneralCards'
import { FeaturesAndBenefits } from '../components/FeaturesAndBenefits'
import { RelatedResources } from '../components/RelatedResources'
import { TeamMembers } from '../components/TeamMembers'
import { ContactBlock } from '../components/ContactBlock'
import { TestimonialSlider } from '../components/TestimonialSlider'
import { FeaturedResource } from '../components/FeaturedResource'
import { ResourceDownload } from '../components/ResourceDownload'
import { PageHeading } from '../components/PageHeading'

type WordPressBlock = React.FC & {
  displayName?: string
  name?: string
  config?: {
    name: string
  }
}
const blocks = {
  DynamicNavigationMenu,
  Columns,
  Pullquote,
  Separator,
  Buttons,
  Button,
  Heading,
  Paragraph,
  Image,
  Hero,
  EventHero,
  TextBlock,
  StatsBlock,
  Testimonial,
  LinksBlock,
  CTABanner,
  GeneralCards,
  RelatedResources,
  TextAndImageBlock,
  TeamMembers,
  ContactBlock,
  FeaturesAndBenefits,
  TestimonialSlider,
  FeaturedResource,
  ResourceDownload,
  List,
  Shortcode,
  Video,
  Gallery,
  Quote,
  Table,
  PageHeading,
}

export default blocks

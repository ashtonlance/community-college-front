import { DefaultHero } from './DefaultHero'
import { LandingHero } from './LandingHero'
import { ScrollIndicator } from './ScrollIndicator'

export type heroTypeProp = 'landing' | 'default'

type HeroAttributesProps = {
  attributes: {
    data: {
      hero_design: heroTypeProp
      background_color: string
      background_image: string
      cta_button_label: string
      cta_button_link: string
      heading: string
      description: string
      background_image_position: string
    }
  }
}

export const Hero = ({ attributes }: HeroAttributesProps) => {
  const heroType = attributes.data.hero_design
  const bgColor = attributes.data.background_color || 'emerald'
  const bgImg = attributes.data.background_image
  const ctaLabel = attributes.data.cta_button_label
  const ctaURL = attributes.data.cta_button_link
  const heading = attributes.data.heading
  const subheading = attributes.data['sub-heading']
  const description = attributes.data.description
  const position = attributes.data.background_image_position

  switch (heroType) {
    case 'landing':
      const emptyBg = !bgImg && (!bgColor || bgColor=='grey');

      return (
        <div className="relative landing-hero-wrapper">
          <LandingHero
            bgColor={bgColor}
            bgImg={bgImg}
            subheading={subheading}
            description={description}
            heading={heading}
            ctaLabel={ctaLabel}
            ctaURL={ctaURL}
            bgPosition={position}
            emptyBg={emptyBg}
          />
          <ScrollIndicator emptyBg={emptyBg}/>
        </div>
      )
    case 'default':
      return (
        <DefaultHero
          bgImg={bgImg}
          subheading={subheading}
          description={description}
          heading={heading}
          ctaLabel={ctaLabel}
          ctaURL={ctaURL}
          bgPosition={position}
        />
      )
  }
}

Hero.displayName = 'nextword/hero'

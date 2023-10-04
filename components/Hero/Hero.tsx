import { DefaultHero } from './DefaultHero'
import { LandingHero } from './LandingHero'
import { ScrollIndicator } from './ScrollIndicator'
import dynamic from 'next/dynamic'

const ProgramFinder = dynamic(() =>
  import('@/components/ProgramFinder').then(mod => mod.ProgramFinderForm)
)
export type heroTypeProp = 'landing' | 'default'

type HeroAttributesProps = {
  attributes: {
    data: {
      hero_design: heroTypeProp
      background_color?: string
      background_image?: string
      background_video_url?: string
      cta_button_label?: string
      cta_button_link?: string
      heading: string
      description: string
      background_image_position?: string
      background_video_file_or_url?: string
      background_video_uploaded?: number
      show_program_finder?: string
    }
  }
}

export const Hero = ({ attributes }: HeroAttributesProps) => {
  const heroType = attributes.data.hero_design
  const bgColor = attributes.data.background_color
  const bgImg = attributes.data.background_image
  let bgVideo = null
  const videoType = attributes?.data?.background_video_file_or_url
  const ctaLabel = attributes.data.cta_button_label
  const ctaURL = attributes.data.cta_button_link
  const heading = attributes.data.heading
  const subheading = attributes.data['sub-heading']
  const description = attributes.data.description
  const position = attributes.data.background_image_position
  const showProgramFinder = attributes?.data?.show_program_finder || 'false'

  if (videoType == 'file') {
    bgVideo = attributes?.data?.background_video_uploaded
  } else if (videoType == 'url') {
    bgVideo = attributes?.data?.background_video_url
  }

  switch (heroType) {
    case 'landing':
      const emptyBg = !bgImg && (!bgColor || bgColor == 'grey') && !bgVideo

      return (
        <>
          <div className="landing-hero-wrapper relative overflow-hidden">
            <LandingHero
              bgColor={bgColor}
              bgImg={bgImg}
              bgVideo={bgVideo}
              videoType={videoType}
              subheading={subheading}
              description={description}
              heading={heading}
              ctaLabel={ctaLabel}
              ctaURL={ctaURL}
              bgPosition={position}
              emptyBg={emptyBg}
              showProgramFinder={showProgramFinder}
            />
            <ScrollIndicator emptyBg={emptyBg} />
          </div>

          {showProgramFinder === 'true' && <ProgramFinder />}
        </>
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

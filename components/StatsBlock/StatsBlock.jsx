import Image from 'next/image'
import { FadeIn } from 'components/FadeIn'
import { Center } from 'components/AnimatedLines/Center'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import { cn } from 'utils'
export const StatsBlock = ({ attributes }) => {
  const title = attributes.data.stats_title
  const copy = attributes.data.stats_copy
  const items = attributes.data.stats
  const marginBottom = attributes.data.component_spacing_bottom_spacing
  const marginTop = attributes.data.component_spacing_top_spacing
  const splitTitle = title.split('-')
  return (
    <FadeIn>
      <div className={cn(`bg-navy flex flex-col items-center justify-center gap-y-[50px] p-[80px] pb-[100px] px-[150px] sm:gap-y-[10px] sm:p-[40px] relative module-margin-top-${marginTop} module-margin-bottom-${marginBottom}`)}>
        <Image
          className="pointer-events-none object-fill object-center"
          src={bg}
          alt=""
          fill
          loading="eager"
          priority
        />
        <div className="z-10">
          {splitTitle.length > 1 ? (
            <div className="flex items-center gap-[15px]">
              <h5 className="text-center text-[16px] font-bold leading-[150%] text-white  sm:text-[14px]">
                {splitTitle[0]}
              </h5>
              <Center className="" />
              <h5 className="text-center text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
                {splitTitle[1]}
              </h5>
            </div>
          ) : (
            <h5 className="text-center text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {title}
            </h5>
          )}
          {copy && (
            <div className="flex flex-col items-center">
              <p className="body-large text-center text-white max-w-[730px]">{copy}</p>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-[100px] sm:flex-col sm:gap-0">
            {items > 0 &&
              [...Array(items).keys()].map(val => (
                <div
                  key={val}
                  className="flex flex-col items-center justify-center gap-[10px]"
                >
                  <h3 className="home-h1 mb-[20px] text-lightBlue font-condensed sm:mb-0">
                    {attributes.data[`stats_${val}_number`]}
                  </h3>
                  <span className="text-white max-w-[300px] text-center font-bold text-[28px] leading-[110%] tracking-[-0.28px]">
                    {attributes.data[`stats_${val}_explainer_text`]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

StatsBlock.displayName = 'nextword/stats'

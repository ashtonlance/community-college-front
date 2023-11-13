import Image from 'next/image'
import { FadeIn } from 'components/FadeIn'
import { Center } from 'components/AnimatedLines/Center'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import { cn } from 'utils'
export const StatsBlock = ({ attributes }) => {
  const title = attributes.data.stats_title
  const copy = attributes.data.stats_copy
  const items = attributes.data.stats
  const splitTitle = title.split('-')
  return (
    <FadeIn>
      <div className={cn(`bg-navy flex flex-col items-center justify-center gap-y-[50px] sm:gap-y-[10px] relative py-[80px] pb-[100px] px-[150px] md:p-[60px] md:pb-[80px] sm:py-[50px] sm:px-[40px]`)}>
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
              <div className="h5 text-center text-[16px] font-bold leading-[150%] text-white  sm:text-[14px]">
                {splitTitle[0]}
              </div>
              <Center className="" />
              <div className="h5 text-center text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
                {splitTitle[1]}
              </div>
            </div>
          ) : (
            title && (
              <div className="h5 text-center text-[16px] font-bold leading-[150%] text-white sm:text-[14px] sm:mb-[32px] md:mb-[40px] mb-[50px]">
              {title}
            </div>
            )
          )}
          {copy && (
            <div className="flex flex-col items-center sm:mb-[32px] md:mb-[40px] mb-[50px]">
              <p className="body-large text-center text-white max-w-[730px]">{copy}</p>
            </div>
          )}
          <div className="flex flex-wrap md:justify-center justify-start gap-[100px] sm:flex-col sm:gap-[20px] md:gap-[50px]">
            {items > 0 &&
              [...Array(items).keys()].map(val => (
                <div
                  key={val}
                  className="flex flex-1 flex-col items-center gap-[12px]"
                >
                  <h3 className="home-h1 sm:text-[76px] text-[92px] mb-[20px] text-lightBlue font-condensed sm:mb-0 mt-0 text-center">
                    {attributes.data[`stats_${val}_number`]}
                  </h3>
                  <span className="text-white max-w-[300px] text-center font-bold sm:text-[24px] text-[28px] leading-[110%] tracking-[-0.28px]">
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

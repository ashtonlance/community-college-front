import { NewsletterBanner } from "components/NewsletterBanner";
import { Button } from "components/Button";
import Link from "next/link";
import linkedin from "../../assets/icons/linkedin.svg";
import Image from "next/image";
import { AboutFooter } from "./AboutFooter";
import { ResourcesFooter } from "./ResourcesFooter";
import { ServicesFooter } from "./ServicesFooter";
import { MobileFooter } from "./MobileFooter";

export const Footer = ({ menuItems }) => {
  const aboutSubitems = menuItems?.nodes?.filter(
    (node) => node.label === "About"
  )[0];
  const resourcesSubitems =
    menuItems?.nodes
      ?.filter((node) => node.label === "Resources")[0]
      ?.navigationMenu?.items.filter(
        (item) => item.title === "Resource Types"
      )[0] || [];
  const servicesSubitems = menuItems?.nodes?.filter(
    (node) => node.label === "Services"
  )[0];
  const events = menuItems?.nodes?.filter((node) => node.label === "Events");

  return (
    <div className="bg-black text-white flex py-[80px] px-[100px] md:p-[60px] sm:p-[40px] justify-between items-start md:flex-col">
      <div className="max-w-[30%] md:max-w-full md:w-full md:flex md:justify-between sm:flex-col">
        <NewsletterBanner
          title="Get the latest from NextWord"
          classes="md:w-[50%] sm:w-full min-h-[150px] flex flex-col justify-evenly hide-label"
          titleHeading="h4"
        />
        <div className="md:w-[40%] sm:w-full">
          <p className="text-[16px] font-bold tracking-[-0.01em] leading-[110%] mb-[15px] text-white">
            2527 Broad Ave, Memphis, TN 38112
          </p>
          <p className="text-[16px] font-bold tracking-[-0.01em] leading-[110%] text-white mb-[20px]">
            <a href="tel:(901) 757-1999">(901) 757-1999</a>
          </p>
          <Link href="/">
            <Image
              alt=""
              src={linkedin}
              width={24}
              height={24}
              className="sm:mb-[32px]"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-between min-w-[35%] md:hidden flex-wrap">
        <AboutFooter
          classlist="order-3 w-[30%]"
          subItems={aboutSubitems?.navigationMenu?.items}
        />
        <ResourcesFooter
          classlist="order-2 w-[30%]"
          subItems={resourcesSubitems?.resourcesLinks}
        />
        <ServicesFooter
          classlist="order-1 w-[30%]"
          subItems={servicesSubitems?.navigationMenu?.items}
        />
      </div>
      <div className="hidden md:flex md:w-full">
        <MobileFooter items={menuItems?.nodes} />
      </div>
      <div className="max-w-[30%] md:max-w-full md:w-full md:flex md:items-baseline md:mt-[30px] sm:flex-col">
        <Button
          content="work with us"
          arrow={true}
          classes="primary-btn bg-white text-black mb-[32px] md:mr-[60px] md:mb-0 sm:w-full sm:justify-center sm:mb-[32px]"
          linkto="https://simplefocus.com"
          target="_blank"
        />
        <div className="font-bold flex flex-col text-white md:flex-row md:gap-[24px]">
          <Link className="mb-[20px] text-[16px] sm:text-[15px]" href="/">
            Login
          </Link>
          <Link href="/customer-support" className="text-[16px] sm:text-[15px]">
            Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
};

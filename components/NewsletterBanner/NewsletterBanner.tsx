import { gql, useQuery } from "@apollo/client";
import { GravityForm } from "components/GravityForm/GravityForm";

export type NewsletterTypeTitleHeading = "h2" | "h3" | "h4";

const NEWSLETTER_FORM_ID = 1;

type NewsletterProps = {
  title: string;
  titleHeading: NewsletterTypeTitleHeading;
  classes: string;
};

const GET_NEWSLETTER_FORM = gql`
${GravityForm.fragments.entry}
query GetNewsletterForm{
  gfForm(id: ${NEWSLETTER_FORM_ID}, idType: DATABASE_ID) {
    ...GravityFormFragment
  }
}`;

export const NewsletterBanner = (props: NewsletterProps) => {
  const headline = `<${props.titleHeading}> ${props.title} </${props.titleHeading}>`;

  return (
    <div className={`newsletter-banner ${props.classes}`}>
      <div dangerouslySetInnerHTML={{ __html: headline }} />
      <div className="relative min-w-[40%] md:min-w-[60%] sm:min-w-[100%] text-white">
        <NewsletterInput customClasses="submit-button-as-arrow" />
      </div>
    </div>
  );
};

export const NewsletterInput = ({ customClasses = "" }) => {
  const { loading, error, data } = useQuery(GET_NEWSLETTER_FORM);

  if (loading) {
    return;
  }
  if (error) {
    console.log({ error });
  }

  return <GravityForm form={data?.gfForm} customClasses={customClasses} />;
};

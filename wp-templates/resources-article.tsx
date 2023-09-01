import { gql } from "@apollo/client";
import { Header } from "components/Header";
import { PreFooter } from "components/PreFooter";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import { Layout } from "components/Layout";
import { ResourcesSinglePageHero } from "components/ResourcesHero/ResourcesSinglePageHero";
import SharePost from "components/SharePost/SharePost";
import { ResourceTags } from "components/ResourceTags/ResourceTags";
import { NewsletterBanner } from "components/NewsletterBanner";
import { RelatedResourcesByTaxonomy } from "components/RelatedResources";

type ResourcesArticleProps = {
  data: {
    resource: {
      id: string;
      title: string;
      link: string;
      date: string;
      excerpt: string;
      blocks: any;
      tags: {
        nodes: [
          {
            name: string;
            link: string;
            id: string;
          }
        ];
      };
      categories: {
        nodes: [
          {
            id: string;
          }
        ];
      };
      seo: {};
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    };
    menus: {
      nodes: {};
    };
    menu: {
      menuItems: {};
    };
  };
  loading: boolean;
};

export default function ResourcesArticle(props: ResourcesArticleProps) {
  if (props.loading) {
    return <>Loading...</>;
  }
  const menuItems = props.data?.menu?.menuItems || [];
  const seo = props.data?.resource?.seo;
  const preFooterContent = props.data?.menus?.nodes[0];
  const postImg = props.data?.resource?.featuredImage?.node?.sourceUrl;
  const postTitle = props.data?.resource?.title;
  const postDate = props.data?.resource?.date;
  const postExcerpt = props.data?.resource?.excerpt;
  const postLink = props.data?.resource?.link;
  const blocks = props.data?.resource?.blocks;
  const tags = props.data?.resource?.tags?.nodes;
  const categories = props.data?.resource?.categories?.nodes?.map(
    (cat) => cat.id
  );
  const tagIds = props.data?.resource?.tags?.nodes?.map((tag) => tag.id);

  return (
    <Layout menuItems={menuItems} seo={seo}>
      <div>
        <ResourcesSinglePageHero
          image={postImg}
          date={postDate}
          title={postTitle}
          excerpt={postExcerpt}
        />
      </div>
      <div className="bg-gmt-100 w-full pt-[100px]">
        <div className="w-[80%] max-w-[1080px] mx-auto resource-single-template">
          {blocks && (
            <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
          )}
          <div className="mt-[64px] md:mt-[52px] sm:mt-[36px] flex justify-between items-center md:flex-col md:items-start md:gap-[26px] border-t-solid border-t-[1.5px] border-t-gmt-300 pt-[64px] md:py-[52px] sm:py-[36px]">
            <ResourceTags nodes={tags} />
            <SharePost postUrl={postLink} />
          </div>
        </div>
        <div className="bg-gmt-100 w-full wrapper-default-inner-pages mx-auto max-w-[2000px]">
          <NewsletterBanner
            title="Sign up for our newsletter to get the latest from GMT."
            titleHeading="h3"
            classes="bg-black py-[60px] px-[100px] sm:p-[40px] flex justify-between items-center gap-[60px] md:flex-col md:gap-[40px] md:text-center"
          />
        </div>
        <RelatedResourcesByTaxonomy tags={tagIds} categories={categories} />
      </div>
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  );
}

ResourcesArticle.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
`;

ResourcesArticle.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

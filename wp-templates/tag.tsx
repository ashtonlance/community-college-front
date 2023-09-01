import { gql } from "@apollo/client";
import { Header } from "components/Header";
import { ResourceTopicHero } from "components/ResourcesHero/ResourcesTopicHero";
import { PreFooter } from "components/PreFooter";
import { GravityForm } from "components/GravityForm/GravityForm";
import { Layout } from "components/Layout";
import { ResourcesSidebar } from "components/ResourcesSidebar/ResourcesSidebar";
import { PaginatedResources } from "components/PaginatedResources/PaginatedResources";
import { FeaturedResource } from "components/FeaturedResource";
import { useRouter } from "next/router";

type TagProps = {
  data: {
    nodeByUri: {
      name: string;
      slug: string;
      description: string;
      seo: {};
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

export default function Tag(props: TagProps) {
  const router = useRouter();

  if (props.loading) {
    return <>Loading...</>;
  } else {
    const menuItems = props.data?.menu?.menuItems || [];
    const seo = props.data?.nodeByUri?.seo;
    const preFooterContent = props.data?.menus.nodes[0];
    const { page } = router.query;
    const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || "1");
    const tagName = props.data?.nodeByUri?.name;
    const tagSlug = props.data?.nodeByUri?.slug;
    const tagContent = props.data?.nodeByUri?.description;

    return (
      <Layout menuItems={menuItems} seo={seo}>
        <div className="flex md:overflow-hidden md:flex-col justify-end border-t-[1.5px] border-t-gmt-200 tag-page">
          <div className="wrapper-default-inner-pages w-[70%] md:w-full">
            <ResourceTopicHero title={tagName} content={tagContent} />
            <div className="hidden mx-[-100px] mb-[60px] md:block top-[-1.5px]">
              <ResourcesSidebar selectedTaxonomy={tagSlug} />
            </div>
            <PaginatedResources tagName={tagSlug} currentPage={currentPage} />
          </div>
          <div className="relative w-[30%] md:hidden right-0 top-[-1.5px] max-w-[600px]">
            <ResourcesSidebar selectedTaxonomy={tagName} />
          </div>
        </div>

        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </Layout>
    );
  }
}

Tag.variables = ({ uri }, ctx) => {
  return {
    uri,
    asPreview: ctx?.asPreview,
  };
};

Tag.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
  query GetTagPage($uri: String!, $asPreview: Boolean = false) {
    nodeByUri(uri: $uri, asPreview: $asPreview) {
      ... on Tag {
        id
        name
        description
        slug
        seo {
          metaDesc
          canonical
          title
          schema {
            raw
          }
        }
      }
    }
    menu(id: "main", idType: SLUG) {
      menuItems {
        nodes {
          ...NavigationMenuFragment
        }
      }
    }
    menus(where: { slug: "footer" }) {
      nodes {
        ...PreFooterFragment
      }
    }
  }
`;

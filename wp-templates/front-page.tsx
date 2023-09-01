import { gql } from "@apollo/client";
import { Header } from "components/Header";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import { PreFooter } from "components/PreFooter";
import { Layout } from "components/Layout";
import { Page, RootQuery } from "generated/graphql";

type FrontPageProps = {
  data: Pick<RootQuery, "nodeByUri" | "menu" | "menus">;
};

export default function FrontPage(props: FrontPageProps) {
  const menuItems = props.data?.menu?.menuItems || [];
  const homePageData = props.data?.nodeByUri as Page;
  const preFooterContent = props.data?.menus.nodes[0];
  const blocks = homePageData && [...homePageData.blocks];
  return (
    <Layout
      menuItems={menuItems}
      seo={homePageData?.seo}
      headerVariant="transparent"
    >
      {blocks && <WordPressBlocksViewer blocks={blocks} />}
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  );
}

FrontPage.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
  query HomePage {
    nodeByUri(uri: "/") {
      ... on Page {
        id
        title
        blocks
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

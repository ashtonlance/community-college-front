import { gql } from "@apollo/client";
import { Header } from "components/Header";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import { PreFooter } from "components/PreFooter";
import { GravityForm } from "components/GravityForm/GravityForm";
import { Layout } from "components/Layout";
import React from "react";
export const PageContext = React.createContext(null);

export default function SingleEvent(props) {
  const menuItems = props.data?.menu?.menuItems || [];
  const pageData = props.data?.event;
  const preFooterContent = props.data?.menus.nodes[0];
  const blocks = pageData && [...pageData.blocks];
  const eventRegistrationForm = props.data?.gfForm;
  if (props.loading) {
    return <>Loading...</>;
  }
  return (
    <Layout
      pageClassName="event-single-page"
      menuItems={menuItems}
      form={eventRegistrationForm}
      seo={pageData?.seo}
      headerVariant="default"
    >
      {blocks && (
        <PageContext.Provider value={props.data.gfForm}>
          <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
        </PageContext.Provider>
      )}
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  );
}

SingleEvent.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

SingleEvent.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
  ${GravityForm.fragments.entry}
`;

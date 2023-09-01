import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import React from "react";

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({
    ctx,
    revalidate: 300, // In seconds
  });
}

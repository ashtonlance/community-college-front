import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import { GetServerSideProps } from "next";

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({
    ctx,
    revalidate: 300, // In seconds
  });
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

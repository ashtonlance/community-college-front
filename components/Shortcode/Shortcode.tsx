import { ShortcodeGravityForm } from "./ShortcodeGravityForm";

export const Shortcode = (props) => {
  const embedContent = props.originalContent as string;
  if (embedContent.includes("gravityform")) {
    const id = embedContent.match(/(?<=id\=").+?(?=")/i)?.[0];
    return <ShortcodeGravityForm ID={id} />;
  } else {
    return <div dangerouslySetInnerHTML={{ __html: props.originalContent }} />;
  }
};

Shortcode.displayName = "core/shortcode";

import { getSeparatorStyle } from "utils/attributesToClassNames";

export const Separator = ({ attributes = null, classes = "" }) => {
  const style = attributes ? getSeparatorStyle(attributes?.className) : classes;

  return <div className={`my-[20px] ${style}`}></div>;
};

Separator.displayName = "core/separator";

export const Pullquote = (props) => {
  const content = props.originalContent;

  return (
    <div
      className="bg-slate-400 p-5"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

Pullquote.displayName = "core/pullquote";

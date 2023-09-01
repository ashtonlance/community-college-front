export const Video = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.originalContent }} />;
};

Video.displayName = "core/video";

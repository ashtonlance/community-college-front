export const getHeadingTag = (headingType, headingContent) => {
  switch (headingType) {
    case "h1":
      return <h1>{headingContent}</h1>;
    case "h2":
      return <h2>{headingContent}</h2>;
    case "h3":
      return <h3>{headingContent}</h3>;
    case "h4":
      return <h4>{headingContent}</h4>;
    case "h5":
      return <h5>{headingContent}</h5>;
    case "h6":
      return <h6>{headingContent}</h6>;
    default:
      return <h1>{headingContent}</h1>;
  }
};

export const getLabelFromCategory = (category) => {
  if (!category) {
    return "Read Article";
  }

  const key = category?.toLowerCase();

  const labelCategoryMap = {
    webinar: "Watch Video",
    news: "Read Article",
    article: "Read Article",
    "case-study": "Read Case Study",
    report: "Get Report",
  };

  return labelCategoryMap[key] || "Read Article";
};

export const getCategoryForResource = (resource) => {
  const categories =
    resource?.categories?.nodes?.filter((node) => node.name !== "Featured") ||
    [];
  return categories[0] || "Resource";
};

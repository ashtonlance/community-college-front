export const getTextAlign = (textAlign = "left") => {
  const textAlignMap = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return textAlignMap[textAlign] || "";
};

export const getWidth = (size) => {
  let cardWidth;

  switch (size) {
    case 1:
      cardWidth = "grow";
      break;
    case 2:
      cardWidth = "w-[calc(50%-10px)]";
      break;
    default:
      cardWidth = "w-[calc(33%-10px)]";
  }

  return cardWidth;
};

export const getFeaturesCardStyle = (cardStyle) => {
  let styleClasses;

  switch (cardStyle) {
    case "black":
      styleClasses = "bg-black text-white";
      break;
    default:
      styleClasses = "bg-transparent";
  }
  return styleClasses;
};

export const getSeparatorStyle = (cardStyle) => {
  let styleClasses;

  switch (cardStyle) {
    case "is-style-wide":
      styleClasses = "bg-gmt-200 h-[1.5px] w-full";
      break;
    case "is-style-default":
      styleClasses = "bg-gmt-200 h-[1.5px] w-[100px] mx-auto";
      break;
    case "is-style-dots":
      styleClasses = "border-dotted border-[1.5px] w-full";
  }
  return styleClasses;
};

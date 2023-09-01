export const SkeletonText = ({ height = `h-[17.6px]` }) => {
  const textClass = `${height} mb-[20px] rounded-md bg-beige animate-pulse max-w-[250px]`;

  return <div className={textClass}></div>;
};

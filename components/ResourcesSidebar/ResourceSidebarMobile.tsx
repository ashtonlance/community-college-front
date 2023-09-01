import { Resource } from "components/ResourcesSidebar/Resource";
import { useState } from "react";

export const ResourcesSidebarMobile = ({ tags, categories }) => {
  const [activeItem, setActiveItem] = useState(null);
  const handleClick = (id) => {
    if (activeItem === id) {
      setActiveItem(null);
    } else {
      setActiveItem(id);
    }
  };

  return (
    <div className="bg-gmt-100 w-full hidden md:flex relative sm:flex-col">
      <Resource
        classList="body-large font-bold"
        title="Filter by Resource Type"
        linkList={categories}
        onClick={handleClick}
        active={activeItem}
      />
      <Resource
        classList="sub-nav"
        title="Resources by Topic"
        linkList={tags}
        onClick={handleClick}
        active={activeItem}
      />
    </div>
  );
};

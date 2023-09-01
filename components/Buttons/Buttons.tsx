import { Button } from "components/Button/Button";

export const Buttons = (props) => {
  const allButtons = props.innerBlocks;

  return (
    <>
      {allButtons.map((buttonContent) => (
        <Button content={buttonContent} key={buttonContent.originalContent} />
      ))}
    </>
  );
};
Buttons.displayName = "core/buttons";

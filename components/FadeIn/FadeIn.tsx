import { motion } from "framer-motion";

type FadeInProps = {
  children: React.ReactNode;
  delay?: boolean;
  delayAmount?: number;
  classes?: string;
};

export const FadeIn = ({
  children,
  delay,
  delayAmount,
  classes,
}: FadeInProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay ? delayAmount : 0 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      className={classes}
    >
      {children}
    </motion.div>
  );
};

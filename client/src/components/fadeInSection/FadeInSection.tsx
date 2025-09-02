// FadeInSection.tsx
import { motion } from "framer-motion";
import { Props } from "@uiTypes/ui";


export default function FadeInSection({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}           // hidden
      whileInView={{ opacity: 1, y: 0 }}        // visible when in viewport
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}    // only animate once, trigger when 20% visible
      className="transition-all"
    >
      {children}
    </motion.div>
  );
}

import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { themeColors } from "../../theme";

export const button = recipe({
  base: {
    padding: "4px 8px",
    backgroundColor: themeColors.primary,
    borderRadius: "12px",
    color: "blue",
  },
  variants: {
    test: {
      true: {
        backgroundColor: "blue",
      },
    },
  },
});

export type ButtonProps = RecipeVariants<typeof button>;

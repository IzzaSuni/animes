import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

type TextProps = {
  isItalic?: boolean;
  isBold?: boolean;
  color?: string;
};

export const Text = styled(Typography)(
  ({ isItalic, isBold, color, onClick }: TextProps & TypographyProps) => ({
    fontStyle: isItalic ? "italic" : "initial",
    fontWeight: isBold ? "bolder" : "normal",
    fontFamily: "uni neue",
    color: color ?? "#292D32",
    cursor: !!onClick ? "pointer" : "default",
  })
);

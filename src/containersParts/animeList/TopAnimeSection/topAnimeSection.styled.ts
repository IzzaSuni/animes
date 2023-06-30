import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ReactComponent as ArrowIcon } from "assets/icons/arrow/arrow-left.svg";
import { Skeleton as SkeletonComponent } from "@mui/material";

export const CarouselWrapper = styled(Box)`
  margin: 0 -100px;
  height: 300px;

  .slick-slider {
    height: 100%;
  }
  .slick-list {
    height: 100% !important;
  }

  .slick-slide {
    scale: 0.9;
    transition: scale ease-in-out 0.3s;
  }
  .slick-center {
    scale: 1;
  }
`;

export const ArrowRight = styled(ArrowIcon)`
  transform: rotate(180deg);
  scale: calc(14 / 24);

  animation: slide-left 0.8s ease-out infinite alternate;

  @keyframes slide-left {
    from {
      translate: 0px;
    }
    to {
      translate: 4px;
    }
  }
`;

export const ArrowLeft = styled(ArrowIcon)`
  scale: calc(14 / 24);

  animation: slide-left 0.8s ease-out infinite alternate;

  @keyframes slide-left {
    from {
      translate: 0px;
    }
    to {
      translate: 4px;
    }
  }
`;

export const CarouselCard = styled.div``;

export const AnimeCardContainer = styled(Box)({
  filter: "drop-shadow(0px 5px 5px rgb(0 0 0 / 20%))",
});

export const AnimeTitleWrapper = styled(Box)`
  padding: 12px;
  width: 100%;
  background: rgb(0 0 0 / 50%);
  border-radius: 0 0 24px 24px;
  position: absolute;
  bottom: 0;
`;

export const Skeleton = styled(SkeletonComponent)`
  transform: scale(1);
  height: 300px;
`;

export const Image = styled.img<{
  position?: string;
  isRounded?: boolean;
  withShadow?: boolean;
}>`
  height: ${({ height }) => height ?? "100%"};
  width: ${({ width }) => width ?? "100%"};
  position: ${({ position }) => position ?? "unset"};
  border-radius: ${({ isRounded = true }) => (isRounded ? "24px" : "0")};
  object-fit: cover;
  box-shadow: ${({ withShadow = true }) =>
    withShadow ? " 0px 5px 10px 0px rgba(0, 0, 0, 0.2)" : "unset"};
  cursor: pointer;
  animation: fade-in 0.3s 1s ease-in forwards;
  opacity: 0;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

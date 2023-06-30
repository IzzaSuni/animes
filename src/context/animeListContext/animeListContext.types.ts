export type SliderIndex = {
  active: number;
  left: number;
  right: number;
};

export type HandleGetSlider = (prop: {
  active: number;
  left: number;
  right: number;
}) => void;

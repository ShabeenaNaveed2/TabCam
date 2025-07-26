export type FilterKey =
  | 'none'
  | 'vintage'
  | 'bw'
  | 'sepia'
  | 'cool'
  | 'warm'
  | 'bright'
  | 'contrast';

export const FILTER_NAMES: Record<FilterKey, string> = {
  none: 'None',
  vintage: 'Vintage',
  bw: 'B&W',
  sepia: 'Sepia',
  cool: 'Cool',
  warm: 'Warm',
  bright: 'Bright',
  contrast: 'Contrast',
};

export const FILTER_MATRICES: Record<FilterKey, number[]> = {
  none: [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0,
  ],
  vintage: [
    0.9, 0.5, 0.1, 0, 0,
    0.3, 0.8, 0.2, 0, 0,
    0.2, 0.3, 0.6, 0, 0,
    0, 0, 0, 1, 0,
  ],
  bw: [
    0.3, 0.3, 0.3, 0, 0,
    0.3, 0.3, 0.3, 0, 0,
    0.3, 0.3, 0.3, 0, 0,
    0, 0, 0, 1, 0,
  ],
  sepia: [
    0.393, 0.769, 0.189, 0, 0,
    0.349, 0.686, 0.168, 0, 0,
    0.272, 0.534, 0.131, 0, 0,
    0, 0, 0, 1, 0,
  ],
  cool: [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1.2, 0, 0,
    0, 0, 0, 1, 0,
  ],
  warm: [
    1.2, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0,
  ],
  bright: [
    1.3, 0, 0, 0, 0,
    0, 1.3, 0, 0, 0,
    0, 0, 1.3, 0, 0,
    0, 0, 0, 1, 0,
  ],
  contrast: [
    1.5, 0, 0, 0, -0.5,
    0, 1.5, 0, 0, -0.5,
    0, 0, 1.5, 0, -0.5,
    0, 0, 0, 1, 0,
  ],
};

export const FILTER_OVERLAYS: Record<FilterKey, string> = {
  none: 'transparent',
  vintage: 'rgba(204, 153, 102, 0.2)',
  bw: 'rgba(120, 120, 120, 0.3)',
  sepia: 'rgba(112, 66, 20, 0.2)',
  cool: 'rgba(100, 200, 255, 0.15)',
  warm: 'rgba(255, 200, 150, 0.15)',
  bright: 'rgba(255, 255, 255, 0.1)',
  contrast: 'rgba(0, 0, 0, 0.15)',
};

const theme = {
  // taken from here: https://ant.design/components/layout/#breakpoint-width
  breakpoints: {
    xs: "480px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px",
  },
};

export default theme;

export type Theme = typeof theme;

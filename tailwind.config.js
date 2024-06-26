/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      yellow: '#fdda24',
      white: '#ffffff',
      black: '#000000',
      red: '#ff0000',
      blue: '#90DCF0',
      green: '#20DFA7',
      purple: '#B596DE',
      pink: '#FFA9DE',
      orange: '#FFA980',
      teal: '#008080',
      gray: '#808080',
      brown: '#a52a2a',
      cyan: '#00ffff',
      navy: '#000080',
      indigo: '#4b0082',
      maroon: '#800000',
      olive: '#808000',
      lavender: '#e6e6fa',
      gold: '#ffd700',
      silver: '#c0c0c0',
      beige: '#f5f5dc',
      peach: '#ffe5b4',
      salmon: '#fa8072',
      magenta: '#ff00ff',
      lime: '#00ff00',
      turquoise: '#40e0d0',
      slate: '#708090',
      ivory: '#fffff0',
      skyBlue: '#87ceeb',
      coral: '#ff7f50',
      forestGreen: '#228b22',
      midnightBlue: '#191970',
      tomato: '#ff6347',
      steelBlue: '#4682b4',
      violet: '#ee82ee',
      darkGreen: '#006400',
      darkBlue: '#00008b',
      darkRed: '#8b0000',
      darkCyan: '#008b8b',
      darkGray: '#a9a9a9',
      darkOrange: '#ff8c00',
      darkMagenta: '#8b008b',
      darkTurquoise: '#00ced1',
      darkSlate: '#2f4f4f',
      darkSlateGray: '#2f4f4f',
      darkOliveGreen: '#556b2f',
      darkKhaki: '#bdb76b',
      darkSeaGreen: '#8fbc8f',
      chocolate: '#d2691e',
      fireBrick: '#b22222',
      hotPink: '#ff69b4',
      limeGreen: '#32cd32',
      orchid: '#da70d6',
      peru: '#cd853f',
      royalBlue: '#4169e1',
      sandyBrown: '#f4a460',
      seaGreen: '#2e8b57',
      sienna: '#a0522d',
      thistle: '#d8bfd8',
      turquoiseBlue: '#00c5cd',
      cadetBlue: '#5f9ea0',
      mediumAquamarine: '#66cdaa',
      mediumPurple: '#9370db',
      mediumSeaGreen: '#3cb371',
      mediumSlateBlue: '#7b68ee',
      mediumTurquoise: '#48d1cc',
      mediumVioletRed: '#c71585',
      paleGoldenrod: '#eee8aa',
      paleGreen: '#98fb98',
      paleTurquoise: '#afeeee',
      paleVioletRed: '#db7093',
      peachPuff: '#ffdab9',
      plum: '#dda0dd',
      powderBlue: '#b0e0e6',
      rosyBrown: '#bc8f8f',
      springGreen: '#00ff7f',
      sandyBrown: '#f4a460',
      tomato: '#ff6347',
      wheat: '#f5deb3',
      yellowGreen: '#9acd32'
    },
  },
  plugins: [],
};

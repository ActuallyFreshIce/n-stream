import { createTheme } from "../types";

const tokens = {
  black: "#000000", // True OLED black
  white: "#EDEDED", // Softer white for less glare
  semantic: {
    red: {
      c100: "#FF6B6B",
      c200: "#E84848",
      c300: "#D43737",
      c400: "#A52A2A",
    },
    green: {
      c100: "#57E389",
      c200: "#2ECC71",
      c300: "#27AE60",
      c400: "#1E8449",
    },
    silver: {
      c100: "#B0B0B0",
      c200: "#8E8E8E",
      c300: "#6E6E6E",
      c400: "#4E4E4E",
    },
    yellow: {
      c100: "#FFF08A",
      c200: "#FFEA55",
      c300: "#D9C84E",
      c400: "#B8A942",
    },
    rose: {
      c100: "#FF5C8D",
      c200: "#C13B61",
      c300: "#A32D4E",
      c400: "#801C3A",
    },
  },
  blue: {
    c50: "#A2C8FF",
    c100: "#7FB0FF",
    c200: "#5894FF",
    c300: "#3C7CFF",
    c400: "#1E62E8",
    c500: "#174BB5",
    c600: "#123A8C",
    c700: "#0E2E6B",
    c800: "#091F4D",
    c900: "#060F2E",
  },
  purple: {
    c50: "#C8A2FF",
    c100: "#A878FF",
    c200: "#8A4BFF",
    c300: "#6C2EFF",
    c400: "#531CCF",
    c500: "#3D149C",
    c600: "#2E0F77",
    c700: "#230B5A",
    c800: "#17063B",
    c900: "#0C031E",
  },
  ash: {
    c50: "#AAAAAA",
    c100: "#888888",
    c200: "#666666",
    c300: "#444444",
    c400: "#2A2A2A",
    c500: "#1E1E1E",
    c600: "#141414",
    c700: "#0E0E0E",
    c800: "#080808",
    c900: "#000000",
  },
  shade: {
    c25: "#1A1A1A",
    c50: "#121212",
    c100: "#0F0F0F",
    c200: "#0C0C0C",
    c300: "#090909",
    c400: "#070707",
    c500: "#050505",
    c600: "#030303",
    c700: "#020202",
    c800: "#010101",
    c900: "#000000",
  },
};

export default createTheme({
  name: "oled-black",
  extend: {
    colors: {
      themePreview: {
        primary: tokens.blue.c200,
        secondary: tokens.purple.c300,
        ghost: tokens.white,
      },

      pill: {
        background: tokens.shade.c200,
        backgroundHover: tokens.shade.c100,
        highlight: tokens.blue.c200,
        activeBackground: tokens.shade.c300,
      },

      global: {
        accentA: tokens.blue.c200,
        accentB: tokens.purple.c200,
      },

      lightBar: {
        light: tokens.blue.c800,
      },

      buttons: {
        toggle: tokens.purple.c300,
        toggleDisabled: tokens.ash.c400,
        danger: tokens.semantic.rose.c300,
        dangerHover: tokens.semantic.rose.c200,
        secondary: tokens.ash.c700,
        secondaryText: tokens.semantic.silver.c100,
        secondaryHover: tokens.ash.c500,
        primary: tokens.white,
        primaryText: tokens.black,
        primaryHover: tokens.semantic.silver.c100,
        purple: tokens.purple.c500,
        purpleHover: tokens.purple.c400,
        cancel: tokens.ash.c500,
        cancelHover: tokens.ash.c300,
      },

      background: {
        main: tokens.black,
        secondary: tokens.shade.c100,
        secondaryHover: tokens.shade.c50,
        accentA: tokens.purple.c500,
        accentB: tokens.blue.c500,
      },

      modal: {
        background: tokens.shade.c100,
      },

      type: {
        logo: tokens.purple.c100,
        emphasis: tokens.white,
        text: tokens.semantic.silver.c100,
        dimmed: tokens.ash.c100,
        divider: tokens.ash.c400,
        secondary: tokens.ash.c200,
        danger: tokens.semantic.red.c100,
        success: tokens.semantic.green.c100,
        link: tokens.purple.c100,
        linkHover: tokens.purple.c50,
      },

      search: {
        background: tokens.shade.c200,
        hoverBackground: tokens.shade.c100,
        focused: tokens.shade.c50,
        placeholder: tokens.ash.c200,
        icon: tokens.ash.c200,
        text: tokens.white,
      },

      mediaCard: {
        hoverBackground: tokens.shade.c100,
        hoverAccent: tokens.purple.c400,
        hoverShadow: tokens.black,
        shadow: tokens.ash.c700,
        barColor: tokens.ash.c200,
        barFillColor: tokens.purple.c100,
        badge: tokens.shade.c200,
        badgeText: tokens.ash.c100,
      },

      largeCard: {
        background: tokens.shade.c100,
        icon: tokens.purple.c400,
      },

      dropdown: {
        background: tokens.shade.c200,
        altBackground: tokens.shade.c100,
        hoverBackground: tokens.shade.c50,
        highlight: tokens.semantic.yellow.c400,
        highlightHover: tokens.semantic.yellow.c200,
        text: tokens.white,
        secondary: tokens.ash.c100,
        border: tokens.shade.c100,
        contentBackground: tokens.shade.c200,
      },

      authentication: {
        border: tokens.shade.c200,
        inputBg: tokens.shade.c200,
        inputBgHover: tokens.shade.c100,
        wordBackground: tokens.shade.c100,
        copyText: tokens.white,
        copyTextHover: tokens.semantic.yellow.c100,
        errorText: tokens.semantic.rose.c100,
      },

      settings: {
        sidebar: {
          activeLink: tokens.shade.c200,
          badge: tokens.shade.c900,
          type: {
            secondary: tokens.ash.c200,
            inactive: tokens.ash.c100,
            icon: tokens.ash.c100,
            iconActivated: tokens.purple.c200,
            activated: tokens.purple.c50,
          },
        },
        card: {
          border: tokens.shade.c100,
          background: tokens.shade.c100,
          altBackground: tokens.shade.c100,
        },
        saveBar: {
          background: tokens.shade.c200,
        },
      },

      utils: {
        divider: tokens.ash.c300,
      },

      onboarding: {
        bar: tokens.shade.c200,
        barFilled: tokens.purple.c300,
        divider: tokens.shade.c100,
        card: tokens.shade.c200,
        cardHover: tokens.shade.c100,
        border: tokens.shade.c200,
        good: tokens.purple.c100,
        best: tokens.semantic.yellow.c100,
        link: tokens.purple.c100,
      },

      errors: {
        card: tokens.shade.c200,
        border: tokens.ash.c400,
        type: {
          secondary: tokens.ash.c200,
        },
      },

      about: {
        circle: tokens.ash.c400,
        circleText: tokens.ash.c100,
      },

      editBadge: {
        bg: tokens.ash.c400,
        bgHover: tokens.ash.c300,
        text: tokens.ash.c100,
      },

      progress: {
        background: tokens.ash.c100,
        preloaded: tokens.ash.c100,
        filled: tokens.purple.c200,
      },

      video: {
        buttonBackground: tokens.ash.c200,
        autoPlay: {
          background: tokens.ash.c600,
          hover: tokens.ash.c500,
        },
        scraping: {
          card: tokens.shade.c200,
          error: tokens.semantic.red.c200,
          success: tokens.semantic.green.c200,
          loading: tokens.purple.c200,
          noresult: tokens.ash.c100,
        },
        audio: {
          set: tokens.purple.c200,
        },
        context: {
          background: tokens.shade.c100,
          light: tokens.white,
          border: tokens.ash.c400,
          hoverColor: tokens.ash.c400,
          buttonFocus: tokens.ash.c400,
          flagBg: tokens.ash.c500,
          inputBg: tokens.ash.c600,
          buttonOverInputHover: tokens.ash.c400,
          inputPlaceholder: tokens.ash.c200,
          cardBorder: tokens.ash.c700,
          slider: tokens.ash.c100,
          sliderFilled: tokens.purple.c200,
          error: tokens.semantic.red.c200,
          buttons: {
            list: tokens.ash.c700,
            active: tokens.ash.c900,
          },
          closeHover: tokens.ash.c800,
          type: {
            main: tokens.semantic.silver.c200,
            secondary: tokens.ash.c200,
            accent: tokens.purple.c200,
          },
        },
      },
    },
  },
});

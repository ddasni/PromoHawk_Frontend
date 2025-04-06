export default defineAppConfig({
  ui: {
    colors: {
      primary: "dark",
      secondary: "cinza",
      //neutral: "zinc", 
    },
    dropdownMenu: {
      slots: {
        content: 'bg-(--ui-secondary)', // cor de fundo do dropdown
      },
    },
  },
});

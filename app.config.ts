export default defineAppConfig({
  ui: {
    colors: {
      primary: "dark",
      secondary: "cinza",
      //neutral: "zinc", 
    },
    dropdownMenu: {
      slots: {
        content: 'bg-(--ui-primary)', // cor de fundo do dropdown
      },
    },
    navigationMenu: {
      slots: {
        viewport: 'bg-(--ui-primary) ring ring-(--ui-secondary)',
        arrow: 'border border-(--ui-secondary) bg-(--ui-primary)'
      },
    },
  },
});

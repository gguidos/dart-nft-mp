export default function makeMainContainer({ sideNavLayout, customLoader }) {
  return Object.freeze({ mainContainer })
  function mainContainer(mainRoutes) {
    const routes = mainRoutes.mainRoutes
    return [{
      type: "v-main",
      routes: [
        {
          type: "v-container",
          routes
        }
      ]
    }]
  }
}
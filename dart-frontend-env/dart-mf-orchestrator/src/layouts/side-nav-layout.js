export default function makeSideNav({ loader }) {
  return Object.freeze({ sideNav })
  function sideNav() {
    return [{
      type: "div",
      attrs: [{
        name: "id",
        value: "side-nav"
      }],
      routes: [
        {
          type: "application",
          name: "@app/app-one",
          props: {
            user: { fname: "Jane" }
          }
        },
      ]
    }]
  }
}
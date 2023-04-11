export default function makeFooter({ loader }) {
  return Object.freeze({ footer })
  function footer() {
    return [{
      type: "div",
      attrs: [{
        name: "id",
        value: "footer"
      }],
      routes: [
        {
          type: "application",
          name: "@app/footer",
          props: {
            user: { fname: "Jane" }
          }
        },
      ]
    }]
  }
}
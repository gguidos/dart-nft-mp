import customLoader from './custom-loader'
import customError from './custom-error'

export default {
  mode: "history",
  routes: [
    {
      type: "div",
      attrs: [{
        name: "id",
        value: "nav"
      }],
      routes: [
        {
          type: "application",
          name: "@app/navigation",
          props: {
            user: { fname: "Jane" }
          }
        },
      ]
    },
    {
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
    },
    {
      type: "route",
      path: "two",
      routes: [{
        type: "div",
        attrs: [{
          name: "id",
          value: "main"
        }],
        routes: [{
          type: "application",
          name: "@app/app-two",
          loader: customLoader,
        }]
      }],
      default: false
    },
    {
      type: "route",
      routes: [{
        type: "#text",
        value: "404 Not found"
      }
      ],
      default: true
    },
    {
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
    },
  ]
}

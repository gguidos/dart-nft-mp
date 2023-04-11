export default  {
  type: "route",
  path: "/",
  routes: [{
    type: "application",
    name: "@app/dashboard"
  }],
  exact: true,
  default: false
}
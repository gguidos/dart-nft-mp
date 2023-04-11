export default  {
  type: "route",
  path: "/login",
  routes: [{
    type: "application",
    name: "@app/login"
  }],
  exact: true,
  default: false
}
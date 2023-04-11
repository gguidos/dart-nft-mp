export default  {
  type: "route",
  path: "/view/:id",
  routes: [
  {
    type: "application",
    name: "@app/dashboard"
  }],
  exact: true,
  default: false
}
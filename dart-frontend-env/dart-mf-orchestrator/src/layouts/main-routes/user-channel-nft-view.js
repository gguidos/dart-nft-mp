export default  {
  type: "route",
  path: "/channel/nft/view/:id",
  routes: [
  {
    type: "application",
    name: "@app/channel"
  }],
  exact: true,
  default: false
}
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
// import microfrontendLayoutConfig from "./microfrontend-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import microfrontendLayoutConfig, { unMountLayout } from "./layouts"

const routes = constructRoutes(microfrontendLayoutConfig);

let applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

applications = unMountLayout({ applications })

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

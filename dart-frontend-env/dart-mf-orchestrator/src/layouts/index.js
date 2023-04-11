import makeMainNavLayout from './main-nav-layout';
import makeSideNavLayout from './side-nav-layout';
import makeMainContainerLayout from './main-container-layout';
// import makeFooterLayout from './footer-layout';
import customLoader from '../custom-loader';
import mainRoutes from './main-routes';

const sideNavLayout = makeSideNavLayout({ customLoader }).sideNav();

export default {
  mode: "history",
  containerEl: "main-content",
  routes: [
    ...makeMainNavLayout({ customLoader }).mainNav(),
    // ...makeSideNavLayout({ customLoader }).sideNav(),
    ...makeMainContainerLayout({ customLoader }).mainContainer({ mainRoutes }),
  //  ...makeFooterLayout({ customLoader }).footer(),
    {
      type: "route",
      routes: [{
        type: "#text",
        value: "404 Not found"
      }
      ],
      default: true
    },
  ]
}

export function unMountLayout({applications}) {
  return applications.map(app => {
    if (app.name === '@app/app-one') 
      app.activeWhen = 
        location => location.pathname.startsWith('registration')
  
    return app
  }) 
}
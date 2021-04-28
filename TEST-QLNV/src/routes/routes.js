
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import UserProfile from "views/UserProfile.js";
import Maps from "views/Map.js"
var routes = [  
  {
    path: "/icons",
    name: "Manage Employee",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Manage customer",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];
export default routes;

import {LoginSuperAdmin} from "../components/superAdmin/login/login";
import {Panel} from "../components/superAdmin/panel/panel";
import { Brand } from "../components/superAdmin/panel/brand/brand";
import { Branch } from "../components/superAdmin/panel/branch/branch";
import { User } from "../components/superAdmin/panel/user/user";
import { Module } from "../components/superAdmin/panel/module/module";
import { Area } from "../components/superAdmin/panel/area/area";
import { CurrentTurn } from "../components/superAdmin/panel/turn/current/currentTurn";
import { HistoryTurn } from "../components/superAdmin/panel/turn/history/historyTurn";
import { Report } from "../components/superAdmin/panel/turn/report/report";
import { Ad } from "../components/superAdmin/panel/ads/ads";
import { Home } from "../components/superAdmin/panel/home";
import { LoginSecretCode } from "../components/secretCodeBranch/login/login";
import { TakeTurn } from "../components/secretCodeBranch/takeTurn/takeTurn";
import { Screen } from "../components/secretCodeBranch/screen/screen";
import { Reception } from "../components/superAdmin/Reception/reception";

export const routes = [
    {
        path: '/login',
        component: LoginSuperAdmin,
    },
    {
        path: '/panel/*',
        component: Panel,
        routes: [    
            {
                path: '/',
                component: Home,
            },
            {
                path: '/brands',
                component: Brand,
            },
            {
                path: '/branches',
                component: Branch,
            },
            {
                path: '/users',
                component: User,
            },
            {
                path: '/modules',
                component: Module,
            },
            {
                path: '/areas',
                component: Area,
            },
            {
                path: '/turns/current',
                component: CurrentTurn,
            },
            {
                path: '/turns/history',
                component: HistoryTurn,
            },
            {
                path: '/turns/report',
                component: Report,
            },
            {
                path: '/ads',
                component: Ad,
            }
        ],
    },
    {
        path: '/brands/:idBrand/login',
        component: LoginSuperAdmin,
    },
    {
        path: '/brands/:idBrand/branches/:idBranch/takeTurn/login',
        component: LoginSecretCode,
    },
    {
        path: '/brands/:idBrand/branches/:idBranch/takeTurn',
        component: TakeTurn,
    },
    {
        path: '/brands/:idBrand/branches/:idBranch/screen/login',
        component: LoginSecretCode,
    },
    {
        path: '/brands/:idBrand/branches/:idBranch/screen',
        component: Screen,
    },
    {
        path: '/brands/:idBrand/reception',
        component: Reception,
    },
    {
        path: '/brands/:idBrand/panel/*',
        component: Panel,
        routes: [    
            {
                path: '/',
                component: Home,
            },
            {
                path: '/branches',
                component: Branch,
            },
            {
                path: '/users',
                component: User,
            },
            {
                path: '/modules',
                component: Module,
            },
            {
                path: '/areas',
                component: Area,
            },
            {
                path: '/turns/current',
                component: CurrentTurn,
            },
            {
                path: '/turns/history',
                component: HistoryTurn,
            },
            {
                path: '/turns/report',
                component: Report,
            },
            {
                path: '/ads',
                component: Ad,
            }
        ],
    },
];
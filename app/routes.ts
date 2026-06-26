import {
  type RouteConfig,
  layout,
  route,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/MainLayout.tsx", [
    index("./pages/Home.tsx"),

    ...prefix("catalog", [
      index("./pages/Catalog.tsx"),
      route(":slug", "./pages/Details.tsx"),
    ]),

    route("testimoni", "./pages/Testimoni.tsx"),
    route("profile", "./pages/Profile.tsx"),

    route("*", "./pages/NotFound.tsx"),

    // index("./routes/Home.tsx"),
  ]),
] satisfies RouteConfig;

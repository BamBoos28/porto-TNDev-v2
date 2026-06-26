import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },
];

export const meta: Route.MetaFunction = () => {
  const title = "TECHNODEV";
  const description =
    "TECHNODEV menyediakan layanan pengembangan website, aplikasi web, sistem informasi, dan solusi digital modern untuk bisnis dan instansi.";

  const url = "https://technodev.id";

  return [
    { title },

    {
      name: "description",
      content: description,
    },

    {
      name: "keywords",
      content:
        "TECHNODEV, jasa website, jasa aplikasi web, software house, web development, sistem informasi, aplikasi bisnis",
    },

    {
      name: "author",
      content: "TECHNODEV",
    },

    /* Open Graph */
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "TECHNODEV",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: url,
    },

    /* Twitter */
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },

    /* SEO */
    {
      name: "robots",
      content: "index,follow",
    },

    {
      rel: "canonical",
      href: url,
    },
  ];
};

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <link rel="icon" type="image/x-icon" href="/dlogo.png" />

        <Meta />
        <Links />
      </head>

      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
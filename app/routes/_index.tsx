import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import fs from 'fs/promises';

export const meta: MetaFunction = () => {
  return [
    { title: "Adam's Blog" },
    { name: "description", content: "Most posts written in one sitting, you get what you pay for" },
  ];
};

export const loader: LoaderFunction = async () => {
  const routes = await fs.readdir('./app/routes');

  return {
    routes: routes.filter((r) => {
      return r !== "_index.tsx";
    })
  }
}

export default function Index() {
  const { routes } = useLoaderData() as any;
  
  return (
    <div>
      <h1>Adam's Blog</h1>
      {routes.map((route: any) => {
        return <Link key={route} to={route}>{route}</Link>
      })}
    </div>
  );
}

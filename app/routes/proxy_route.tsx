import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   try {
//     console.log("🔐 Admin Authentication Successful");
//     const { admin } = await authenticate.public.appProxy(request);
//     //const { admin } =await authenticate.admin(request);
//     if (!admin) {
//       return new Response(JSON.stringify({ error: "Unauthorized request." }), { status: 403 });
//     }
//     console.log("🔐 Admin Authentication Successful");
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     return new Response(JSON.stringify({ error: "Authentication failed." }), { status: 500 });
//   }
//   return { message: "App is ready" };
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Use the authentication API from the Remix template
  await authenticate.public.appProxy(request);

  // Read URL parameters added by Shopify when proxying
  const url = new URL(request.url);
  return {
    shop: url.searchParams.get("shop"),
    loggedInCustomerId: url.searchParams.get("logged_in_customer_id"),
  };
};

export default function MyAppProxy() {
  const { shop, loggedInCustomerId } = useLoaderData();

  return <div>{`Hello world from ${loggedInCustomerId || "not-logged-in"} on ${shop}`}</div>;
}
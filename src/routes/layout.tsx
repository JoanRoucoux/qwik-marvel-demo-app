import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => (
  <div class="flex flex-col min-h-screen bg-base-300">
    <div class="navbar sticky top-0 justify-center bg-primary text-primary-content">
      <p class="text-xl">Marvel Search App</p>
    </div>
    <main class="grow max-w-[81rem] w-full self-center px-8">
      <Slot />
    </main>
    <footer class="footer footer-center sticky bottom-0 p-4">
      <aside>
        <p>Data provided by Marvel. © {new Date().getFullYear()} Marvel</p>
      </aside>
    </footer>
  </div>
));

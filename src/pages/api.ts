const STATIC_HOME = "https://mitchellbusby.github.io";

export async function GET({ params, request }) {
  const posts = import.meta.glob("./*.astro");
  const postMeta: { url: string }[] = (await Promise.all(
    Object.values(posts).map((p) => p())
  )) as any;

  return new Response(
    JSON.stringify({
      posts: postMeta.map((m) => `${STATIC_HOME}${m.url}`),
      home: `${STATIC_HOME}/wwo-24/`,
      allEntriesForAPI: "https://octothorp.es/~/API",
    })
  );
}

// TODO: this actually needs to keep track of usages :(

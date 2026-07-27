import { Experience } from "../components/Experience";

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <Experience initialPath={`/${slug.join("/")}`} />;
}

import RocketButton from "../components/rocket-button";

export default function Home() {
  const CONTENT = {
    hero: {
      title: "Quick Campaign",
      description: "Create and play a quick dungeon and dragons campaign.",
    },
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-8">
        <RocketButton destination="/form" decoration={true} />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{CONTENT.hero.title}</h1>
          <p className="text-lg">{CONTENT.hero.description}</p>
        </div>
      </div>
    </div>
  );
}

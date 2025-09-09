import Hero from "./Hero";
import PropertiesList from "./PropertiesList";

export default function Home({ propertiesRef }) {
  return (
    <>
      <Hero />
      <PropertiesList propertiesRef={propertiesRef}/>
    </>
  );
}

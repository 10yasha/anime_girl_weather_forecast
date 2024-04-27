import { cities } from "country-cities";

interface city {
  cityId: string;
  name: string;
  altName: string;
  country: string;
  featureCode: string;
  adminCode: string;
  population: number;
  loc: {
    type: string;
    coordinates: number[];
  };
}

function App() {
  function getCities() {
    return cities.all().filter((city) => city.name.match("Calgary"));
  }
  return (
    <>
      <div>
        <h1>{getCities()[0].name}</h1>
        <h1>{getCities()[0].latitude}</h1>
        <h1>{getCities()[0].longitude}</h1>

        <h1>HELLO</h1>
      </div>
    </>
  );
}

export default App;

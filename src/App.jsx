import Search from "./components/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import InfoCard from "./components/InfoCard";
import ReposCard from "./components/ReposCard";

function App() {
  const [githubData, setGithubData] = useState({});

  useEffect(() => {
    axios
      .get("https://api.github.com/users/github")
      .then((response) => {
        setGithubData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, []);

  return (
    <main>
      <div className="relative flex justify-center">
        <img src="./hero-image-github-profile.png" alt="space image github" />
        <Search />
      </div>

      <section className="px-3 md:px-72 pb-10">
        <div className="flex gap-16">
          <div className="w-[115px] h-[115px] relative">
            <img
              src={githubData.avatar_url}
              alt=""
              className="rounded-2xl absolute -top-11 p-2 bg-[#20293A] object-cover"
            />
          </div>
          <div className="flex gap-5 pt-3">
            <InfoCard name="Followers" information={githubData.followers} />
            <InfoCard name="Following" information={githubData.following} />
            <InfoCard name="Location" information={githubData.location} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold -mt-7">{githubData.name}</h1>
          <p className="text-base text-[#96A3B5] -mt-2">{githubData.bio}</p>

          <ReposCard />
        </div>
      </section>
    </main>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import InfoCard from "./components/InfoCard";
import ReposCard from "./components/ReposCard";

function App() {
  const [githubData, setGithubData] = useState({});
  const [defaultUsername, setDefaultUsername] = useState("github");

  useEffect(() => {
    fetchGithubData(defaultUsername);
  }, [defaultUsername]);

  const fetchGithubData = (username) => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        setGithubData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  };

  const handleSearch = (username) => {
    setDefaultUsername(username);
  };

  return (
    <main>
      <div className="relative flex justify-center">
        <img src="./hero-image-github-profile.png" alt="space image github" className="w-full h-56 lg:h-auto object-cover" />
        <Search onSearch={handleSearch} />
      </div>

      <section className="px-3 sm:px-3 lg:px-72 pb-10">
        <div className="flex gap-5 lg:gap-16 pb-16 sm:pb-2 lg:pb-0">
          <div className="w-[115px] h-[115px] relative">
            <img
              src={githubData.avatar_url}
              alt={`Github avatar image ${githubData.name}`}
              className="rounded-2xl absolute -top-9 sm:-top-11 lg:-top-11 p-2 bg-[#20293A] object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-row gap-2 lg:gap-5 pt-3">
            <InfoCard name="Followers" information={githubData.followers} />
            <InfoCard name="Following" information={githubData.following} />
            <InfoCard name="Location" information={githubData.location || "'No location'"} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold -mt-7">{githubData.name || "'No name available'"}</h1>
          <p className="text-base text-[#96A3B5] -mt-2">{githubData.bio || "'No bio available'"}</p>

          <ReposCard username={defaultUsername} />
        </div>
      </section>
    </main>
  );
}

export default App;

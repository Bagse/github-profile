import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

function ReposCard() {
  const [reposData, setReposData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/github/repos")
      .then((response) => {
        // Obtener los primeros 4 repositorios
        const firstFourRepos = response.data.slice(0, 4);
        setReposData(firstFourRepos);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, []);

  const formatUpdateDistance = (dateString) => {
    const distance = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    return `updated ${distance}`;
  };

  return (
    <div className="flex flex-col place-items-center">
      <div className="grid grid-cols-2 gap-7 mt-5">
        {reposData.map((repo) => (
          <div
            key={repo.id}
            className="bg-gradient-to-r from-[#111729] to-[#1D1B48] w-full h-36 py-4 px-6 rounded-xl shadow-md flex flex-col gap-2 hover:scale-105 duration-300 transition-all place-content-center"
          >
            <h2 className="text-lg font-semibold">{repo.name}</h2>
            <p className="text-[#96A3B6] text-sm line-clamp-2 pb-3">
              {repo.description}
            </p>

            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <img src="./Nesting.svg" alt="" />
                <span className="text-sm text-[#96A3B6] font-medium">
                  {repo.forks_count}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <img src="./Star.svg" alt="" />
                <span className="text-sm text-[#96A3B6] font-medium">
                  {repo.stargazers_count}
                </span>
              </div>

              <span className="text-xs text-[#96A3B6] font-medium">
                {formatUpdateDistance(repo.updated_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-10 text-[#97A4B7] hover:text-[#CDD5E0] transition-all duration-200 w-40">
        View all repositories
      </button>
    </div>
  );
}

export default ReposCard;

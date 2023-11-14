import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

function ReposCard({ username }) {
  const [reposData, setReposData] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const firstFourRepos = response.data.slice(0, 4);
        setReposData(firstFourRepos);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchRepos();
  }, [username]);

  const formatUpdateDistance = (dateString) => {
    const distance = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    return `updated ${distance}`;
  };

  return (
    <div className="flex flex-col place-items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 sm:gap-x-4 lg:gap-x-10 gap-y-8 mt-5">
        {reposData.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-no-underline"
          >
            <div className="bg-gradient-to-r from-[#111729] to-[#1D1B48] w-[24rem] sm:w-[21.4rem] lg:w-[28rem] h-36 py-4 px-4 sm:px-3 md:px-6 rounded-xl shadow-md flex flex-col gap-2 hover:scale-105 duration-300 transition-all place-content-center">
              <h2 className="text-lg font-semibold">{repo.name}</h2>
              <p className="text-[#96A3B6] text-sm line-clamp-2 pb-3">
                {repo.description || "No description available"}
              </p>

              <div className="flex gap-3 sm:gap-2 items-center">
                {repo.license ? (
                  <div className="flex items-center gap-1">
                    <img src="./Chield_alt.svg" alt="chield icon image" />
                    <span className="text-sm text-[#96A3B6] font-medium">
                      {repo.license.spdx_id}
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center gap-1">
                  <img src="./Nesting.svg" alt="nesting icon image" />
                  <span className="text-sm text-[#96A3B6] font-medium">
                    {repo.forks_count}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <img src="./Star.svg" alt="star icon image" />
                  <span className="text-sm text-[#96A3B6] font-medium">
                    {repo.stargazers_count}
                  </span>
                </div>

                <span className="text-xs text-[#96A3B6] font-medium">
                  {formatUpdateDistance(repo.updated_at)}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <a
        href={`https://github.com/orgs/${username}/repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 text-[#97A4B7] hover:text-[#CDD5E0] transition-all duration-200 w-40 text-sm"
      >
        View all repositories
      </a>
    </div>
  );
}

export default ReposCard;

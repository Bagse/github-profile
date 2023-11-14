import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Search({ onSearch }) {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const inputStyle = {
    color: "#CDD5E0",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${inputValue}`
      );
      const user = response.data;
      setSuggestions([user]);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error al obtener sugerencias de usuarios:", error);
    }
  };

  const handleSuggestionClick = async (selectedUsername) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${selectedUsername}`
      );
      const user = response.data;
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch(username);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form
      className="absolute top-4 md:top-10 bg-[#20293A] rounded-lg p-4 w-[370px] lg:w-[550px] flex items-center gap-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-[#3662E3] shadow-md"
      onSubmit={handleFormSubmit}
      ref={inputRef}
    >
      <img src="./Search.svg" alt="search icon" className="w-[25px]" />
      <input
        type="text"
        placeholder="username"
        className="w-full bg-[#20293A] outline-none"
        style={inputStyle}
        value={username}
        onChange={handleInputChange}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-20 right-0 flex flex-col gap-2">
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="relative rounded-lg z-20 w-[370px] md:w-[550px] h-[65px] md:h-auto p-2 cursor-pointer bg-[#111729] hover:bg-[#253345] flex items-center gap-3 shadow-md"
              onClick={() => handleSuggestionClick(user.login)}
            >
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-14 md:w-16 h-14 md:h-16 rounded-xl"
              />
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">
                  {user.login || "No name available"}
                </span>
                <span className="text-xs text-[#96a3b6]">
                  {user.bio || "No bio available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default Search;

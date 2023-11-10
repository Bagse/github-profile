function Search() {
  const inputStyle = {
    color: "#CDD5E0",
  };

  return (
    <div className="absolute top-10 bg-[#20293A] rounded-lg p-4 w-[550px] flex items-center gap-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-[#3662E3] shadow-md">
      <img src="./Search.svg" alt="" className="w-[25px]" />
      <input
        type="text"
        placeholder="username"
        className="w-full bg-[#20293A] outline-none"
        style={inputStyle}
      />
    </div>
  );
}

export default Search;

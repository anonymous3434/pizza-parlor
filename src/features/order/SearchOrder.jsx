import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchQuery, setSearchQury] = useState(""),
    navigate = useNavigate(),
    handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/order/${searchQuery}`);
      setSearchQury("");
    };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #"
        value={searchQuery}
        onChange={(e) => setSearchQury(e.target.value)}
        className="w-32 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;

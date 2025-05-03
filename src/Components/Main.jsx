import React, { useState, useEffect } from "react";
import { FaDownload, FaHeart, FaRegBookmark } from "react-icons/fa";

const Main = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

  // 🔍 Search-based image fetch
  const myFun = async () => {
    if (!search) return;
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${search}&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // 🌐 Random images on page load
  useEffect(() => {
    const loadRandomImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=9&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error loading random images:", error);
      }
    };

    loadRandomImages();
  }, []);
 

  return (
    <div>
      <h1 className="text-center text-5xl font-bold">Image Generator</h1>

      <div className="md:flex items-center px-5 justify-center py-10 gap-10">
        <input
          onChange={handleSearch}
          onKeyDown={(e) =>{
            if(e.key === "Enter"){
              myFun(); 
            }
          }}
          type="text"
          placeholder="Search Images"
          className="p-3 rounded-lg w-full px-5 md:w-100 bg-gray-100 text-black text-xl"
        />
        <button
          onClick={myFun}
          className="bg-yellow-600 w-full md:w-30  mt-5 md:mt-0 px-5 py-3 rounded font-bold text-white hover:bg-yellow-500 cursor-pointer"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Top-right icons */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
                <FaHeart className="text-red-500" />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
                <FaRegBookmark className="text-blue-500" />
              </button>
            </div>

            {/* Bottom-right download button */}
            <a
              href={image.links.download}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-600"
            >
              <FaDownload />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

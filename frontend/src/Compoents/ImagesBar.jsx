import React, { useState } from "react";

const ImagesBar = () => {
  const images = [
    "https://images.unsplash.com/photo-1710891437634-85ad1b1f0a88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvb3JnfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1600100397849-3a782cfd8492?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGthcm5hdGFrYXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1681103038547-d26fe6752de2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvb3JnfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/flagged/photo-1592544858330-7ac10a0468e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29vcmd8ZW58MHwwfDB8fHww&auto=format&fit=crop&q=60&w=600",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Image */}
      <div className="w-full max-w-3xl">
        <img
          src={mainImage}
          className="w-full rounded-lg"
          alt="Main"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 max-w-3xl gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
            alt={`Thumb ${index + 1}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesBar;

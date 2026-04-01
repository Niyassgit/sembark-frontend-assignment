import React from "react";
import { getPrducts } from "../services/productService";

const Products = () => {
  // const value = getPrducts();
  // console.log("values fetched:", value);
  return (
    <div className="max-w-64">
      <div className="group">
        <img
          className="group-hover:hidden rounded-lg"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png"
          alt="img1"
        />
        <img
          className="hidden group-hover:block rounded-lg"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png"
          alt="img2"
        />
      </div>
      <p className="text-sm mt-2">White crew-Neck T-Shirt</p>
      <p className="text-xl">$29.00</p>
    </div>
  );
};

export default Products;

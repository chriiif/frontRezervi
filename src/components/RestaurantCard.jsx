import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    // 'en-GB' gives a DD/MM/YYYY format
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function RestaurantCard({
  
  name,
  date_debut,
  date_fin,
  description,
  id,
}) {
  if (!id) {
    console.error("RestaurantCard is missing the 'id' prop.");
  }

  return (
    <div className="bg-gray-100 shadow-lg rounded-md overflow-hidden w-full sm:w-1/2 lg:w-1/4 transition-transform hover:scale-105">
      <img
        src={`https://static.vecteezy.com/system/resources/previews/016/152/679/original/special-offer-ribbon-design-template-banner-sale-tag-market-special-offer-discount-label-vector.jpg`}
        alt="Restaurant"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <Typography variant="h6" className="font-bold">
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-gray-600 my-2"
        >
          Date Debut: {formatDate(date_debut)} {/* Format the date */}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-gray-600 my-2"
        >
          Date Fin: {formatDate(date_fin)} {/* Format the date */}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-gray-600 my-2"
        >
          {description}
        </Typography>
        <Link to={`/destinations`}>
          {" "}
          {/* Navigate dynamically to the restaurant page */}
          <Button
            variant="contained"
            color="secondary"
            className="bg-purple-600 text-white mt-2 w-full"
          >
            Reserve Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

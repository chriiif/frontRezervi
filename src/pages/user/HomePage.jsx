import {
  Button,
  Typography,
  Container,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../../components/RestaurantCard";
import TeamMemberCard from "../../components/TeamMemberCard";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import image from "../../assets/offers.png";

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/offers/allOffers`
        );
        console.log("API Response:", response); 
        if (Array.isArray(response.data.offers)) {
          setData(response.data.offers);
        } else {
          console.error("Data is not in the expected format:", response.data);
          setData([]); 
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        setData([]); 
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="hide-scrollbar scroll-smooth">
      <NavBar />
      <div
        className="w-full h-[100vh] bg-cover bg-center flex items-center text-white px-4 py-11"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/R.b636420b818cb49ba69a09bb317a2eea?rik=UdFKVevhs4c2dQ&riu=http%3a%2f%2fnextrestaurants.com%2fwp-content%2fuploads%2f2018%2f07%2fRestaurant-Online-Reservation-Systems.png&ehk=AGi4w6a2zL1HIdStleqCZ72qFAW%2bM36FSrE1uyoFRAw%3d&risl=&pid=ImgRaw&r=0')",
        }}
      >
        <div className="max-w-lg text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover & Book the Best Restaurants
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Find top-rated restaurants and cafes, and reserve your table in
            seconds with ease and style. Discover new dining experiences and
            explore a diverse selection of venues, each offering a unique
            ambiance and exquisite flavors. Whether you're planning a cozy
            dinner for two or a lively gathering with friends, Reservi makes
            booking simple, fast, and tailored to your tastes.
          </p>
          <Button
            variant="contained"
            color="secondary"
            className="bg-purple-600 text-white px-6 py-2 rounded-md"
          >
            Explore Now
          </Button>
        </div>
      </div>

      <Divider className="my-12 border-gray-300" />

      <div className="my-12 w-full flex flex-col items-center justify-center">
        <h4 className="text-3xl font-semibold mb-6 text-center">
          Recommended for You
        </h4>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((offer) => (
              <RestaurantCard
                key={offer.id}
                id={offer.id} 
                name={offer.name}
                date_debut={offer.date_debut}
                date_fin={offer.date_fin}
                description={offer.description}
              />
            ))
          ) : (
            <p>No offers available at the moment.</p>
          )}
        </div>
      </div>

      <Divider className="my-12 border-gray-300" />

      <Container className="my-12 p-8 bg-gray-100 rounded-lg shadow-lg text-center">
        <h4 className="text-3xl font-semibold mb-6">About Reservi</h4>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Reservi is dedicated to connecting you with the best dining
          experiences around. Whether you're looking for fine dining, casual
          eats, or local cafes, our platform makes it easy to find and book
          tables at top-rated spots.
        </p>
      </Container>

      <Divider className="my-12 border-gray-300" />

      {/* Our Team */}
      <Container className="my-12 text-center">
        <h4 className="text-3xl font-semibold mb-6">Meet Our Team</h4>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-6">
          Our team is passionate about helping you discover new dining
          experiences. Get to know the people behind Reservi.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4, 5].map((member) => (
            <TeamMemberCard
              key={member}
              image="https://th.bing.com/th/id/R.87fe81902f20b432305cbc16df7cd64d?rik=bBA05VZsvriT2w&pid=ImgRaw&r=0"
              name={`Team Member ${member}`}
              role="Role and a short bio of the team member."
            />
          ))}
        </div>
      </Container>

      <Divider className="my-12 border-gray-300" />

      {/* Contact Us Form */}
      <Container className="my-20 py-16 text-center">
        <Typography variant="h4" className="text-3xl font-semibold mb-8">
          Contact Us
        </Typography>
        <Box component="form" className="max-w-md mx-auto space-y-6">
          <TextField fullWidth label="Your Name" variant="outlined" />
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={6}
          />
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600 text-white w-full"
          >
            Send Message
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

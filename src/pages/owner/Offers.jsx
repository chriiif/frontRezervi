import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [date_debut, setDateDebut] = useState("");
  const [date_fin, setDateFin] = useState("");
  const [description, setDescription] = useState("");
  const [id_destination, setIdDestination] = useState("");
  const navigate = useNavigate();

  const id = localStorage.getItem("ownerId");

  // Fetch offers by owner
  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/offers/offetsbyowner/${id}`
      );
      setOffers(response.data);
    } catch (err) {
      console.error("Error fetching Offers:", err);
      toast.error("Failed to load offers.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchOffers();
    } else {
      navigate("/login");
    }
  }, [id, navigate]);

  // Fetch destinations by owner
  useEffect(() => {
    axios
      .get(`http://localhost:5000/destinations/owner/${id}`)
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((err) => {
        console.error("Error fetching Destinations:", err);
        toast.error("Failed to load destinations.");
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOffer = {
      name,
      date_debut,
      date_fin,
      description,
      id_destination,
    };

    try {
      await axios.post("http://localhost:5000/offers/addOffer", newOffer);
      toast.success("Offer added successfully");
      setName("");
      setDateDebut("");
      setDateFin("");
      setDescription("");
      setIdDestination("");
      fetchOffers();
    } catch (err) {
      console.error("Error adding Offer:", err);
      toast.error("Failed to add offer.");
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`http://localhost:5000/offers/deleteOffer/${offerId}`);
      toast.success("Offer deleted successfully");
      setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));
    } catch (err) {
      console.error("Error deleting Offer:", err);
      toast.error("Failed to delete offer.");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6">Add Offer</h1>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          required
          value={date_debut}
          onChange={(e) => setDateDebut(e.target.value)}
        />

        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          fullWidth
          required
          value={date_fin}
          onChange={(e) => setDateFin(e.target.value)}
        />

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Destination</InputLabel>
          <Select
            label="Destination"
            value={id_destination}
            onChange={(e) => setIdDestination(e.target.value)}
          >
            {destinations.map((destination) => (
              <MenuItem key={destination.id} value={destination.id}>
                {destination.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" className="w-full py-3">
          Add Offer
        </Button>
      </form>

      {/* Offers Table Section */}
      <TableContainer component={Paper} className="mt-10">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell className="font-bold">Image</TableCell>
              <TableCell className="font-bold">Destination Name</TableCell>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Start Date</TableCell>
              <TableCell className="font-bold">End Date</TableCell>
              <TableCell className="font-bold">Description</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>
                  <Avatar
                    src={`http://localhost:5000/${offer.image}`}
                    alt={offer.name}
                    className="w-16 h-16 rounded-full"
                    variant="rounded"
                  />
                </TableCell>
                <TableCell>{offer.destination_name}</TableCell>
                <TableCell>{offer.name}</TableCell>
                <TableCell>{offer.date_debut}</TableCell>
                <TableCell>{offer.date_fin}</TableCell>
                <TableCell>{offer.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(offer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Offers;

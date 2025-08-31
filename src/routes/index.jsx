import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DestinationDetailsPage from "../pages/DestinationDetailsPage";
import ItineraryPage from "../pages/ItineraryPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/destination/:id", element: <DestinationDetailsPage /> },
  { path: "/itinerary", element: <ItineraryPage /> },
  { path: "*", element: <NotFound /> },
]);

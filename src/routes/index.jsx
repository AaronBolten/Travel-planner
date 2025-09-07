import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import DestinationDetailsPage from "../pages/DestinationDetailsPage.jsx";
import ItineraryPage from "../pages/ItineraryPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import DestinationsPage from "../pages/DestinationsPage.jsx";
export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/destinations", element: <DestinationsPage /> },
  {path: "destination/:id", element: <DestinationDetailsPage/>},
  { path: "/itinerary", element: <ItineraryPage /> },
  { path: "*", element: <NotFound /> },
]);

export default router;

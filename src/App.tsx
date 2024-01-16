import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Account from "./components/account/Account";
import Profile from "./components/profile/Profile";
import Campaign from "./components/campaign/Campaign";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Account />}>
      <Route index element={<Account />} />
      <Route path="/accounts" element={<Account />} />
      <Route path="/accounts/:accountId/profiles" element={<Profile />} />
      <Route path="/profiles/:profileId/campaigns" element={<Campaign />} />
    </Route>
    //  <Route path="*" element={<NotFound />} />
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

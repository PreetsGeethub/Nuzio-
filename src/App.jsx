import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Language from "./pages/Language";
import Login from "./pages/Login";
import Profession from "./pages/Profession";
import Interests from "./pages/Interests";
import Preferences from "./pages/Preferences";
import Time from "./pages/Time";
import News from "./pages/News";
import StayIn from "./pages/StayIn";
import Ready from "./pages/Ready";
function App() {
  return (
    <BrowserRouter>
      <Routes>
     
  <Route path="/" element={<Splash />} />
  <Route path="/language" element={<Language />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profession" element={<Profession />} />
  <Route path="/interests" element={<Interests />} />
  <Route path="/preferences" element={<Preferences />} />
<Route path="/time" element={<Time />} />
<Route path="/stay-in" element={<StayIn />} />
<Route path="/ready" element={<Ready />} />
<Route path="/news" element={<News />} />
</Routes>
      
    </BrowserRouter>
  );
}

export default App;
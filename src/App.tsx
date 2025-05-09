import { Toaster } from "sonner";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

const App = () => (
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);

export default App;

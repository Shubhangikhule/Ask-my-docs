import Home from "./pages/Home";
import { UploadProvider } from "./context/UploadContext";

function App() {
  return (
    <UploadProvider>
      <Home />
    </UploadProvider>
  );
}

export default App;
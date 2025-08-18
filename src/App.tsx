import { Navbar } from "./components/Navbar";
import AppRoutes from "./routes";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <AppRoutes />
      </div>
    </>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <main className="container mx-auto sm:px-10 px-4">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="*"
              element={
                <h1 className="text-3xl text-center my-10">
                  La página a la que intentas entrar no existe
                </h1>
              }
            ></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

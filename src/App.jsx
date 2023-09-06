import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

import Form from "./components/Form";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// dist/index.html                   0.46 kB │ gzip:   0.30 kB
// dist/assets/icon-98c6b6d7.png    20.20 kB
// dist/assets/index-3bb1f490.css   30.27 kB │ gzip:   5.08 kB
// dist/assets/index-dea2e19a.js   524.63 kB │ gzip: 148.58 kB

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// dist/index.html                           0.46 kB │ gzip:   0.30 kB
// dist/assets/icon-98c6b6d7.png            20.20 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-02b2a867.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-63e067fc.css           26.60 kB │ gzip:   4.37 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-04b59cf3.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-5f2eaded.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-e3e15882.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-974a0af1.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-3eedceae.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-99721d07.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-955f7d6a.js             1.01 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-e8632ad1.js       157.04 kB │ gzip:  46.22 kB
// dist/assets/index-76dc49c2.js           365.97 kB │ gzip: 101.84 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

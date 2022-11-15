import * as React from 'react';
import "./App.css";
import Home from './components/Home';
import NotFound from './components/NotFound';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import DisplayTable from "./components/MainDisplay.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <StyledEngineProvider injectFirst>
				<BrowserRouter>
				<Routes>
								<Route path="/" element={<Home />} />
								<Route path="fetch-mdata" element={<DisplayTable />} />
								<Route path="*" element={<NotFound />} />
				</Routes>
				</BrowserRouter>
  </StyledEngineProvider>
);

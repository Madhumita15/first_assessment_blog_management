
import { RouterProvider } from 'react-router-dom';
import './App.css'
import { Toaster } from "sonner";
import Routes from './routes/Routes';
import ReduxProvider from './services/provider/ReduxProvider';

function App() {
  

  return (
    <>
     <Toaster position="top-right" richColors closeButton />
      <ReduxProvider>
          <RouterProvider router={Routes} />
      </ReduxProvider>
    </>
  )
}

export default App

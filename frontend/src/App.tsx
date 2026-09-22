
import { RouterProvider } from 'react-router-dom';
import './App.css'
import { Toaster } from "sonner";
import Routes from './routes/Routes';

function App() {
  

  return (
    <>
     <Toaster position="top-right" richColors closeButton />
      {/* <ReduxProvider> */}
        {/* <AuthInitializer> */}
          <RouterProvider router={Routes} />
        {/* </AuthInitializer> */}
      {/* </ReduxProvider> */}
    </>
  )
}

export default App

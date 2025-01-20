import { AllRoutes } from './routes/AllRoutes';
import { Header, Footer } from './components';
import { ScrollToTop } from './components';
import './App.css';

function App() {
  return (
    <div className="App dark:bg-darkbg">
      <ScrollToTop />
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;

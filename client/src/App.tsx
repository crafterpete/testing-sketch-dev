
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FantasyMap } from './components/FantasyMap';
import { GameInterface } from './components/GameInterface';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fantasy-dark via-purple-900 to-fantasy-dark">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1">
            <GameInterface />
          </div>
          <div className="order-1 lg:order-2">
            <FantasyMap />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

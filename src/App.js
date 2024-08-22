import React, { useState } from 'react';
import './App.css';

const mates = [
  {
    id: 1,
    image: 'imperialVirolaAlpaca.jpg',
    name: 'Imperial Virola Alpaca',
    price: '$16000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cerámica.',
  },
  {
    id: 2,
    image: 'imperialBlanco.jpg',
    name: 'Imperial premium',
    price: '$20000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de tela con puntitos.',
  },
  {
    id: 3,
    image: 'imperialBaseBolitasNegro.jpg',
    name: 'Imperial con base de bolitas',
    price: '$16000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cerámica.',
  },
  {
    id: 4,
    image: 'imperialPremiumBaseBolita.jpg',
    name: 'Imperial Premium con base de bolitas',
    price: '$16000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cerámica.',
  },
  {
    id: 5,
    image: 'imperial.jpg',
    name: 'Imperial negro',
    price: '$15000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cuero.',
  },
  {
    id: 6,
    image: 'camioneroVirolaAcero.jpg',
    name: 'Camionero',
    price: '$22000',
    description: 'Virola de acero, interior 100% calabaza y exterior de cuero labrado.',
  },
  {
    id: 7,
    name: 'Algarrobo',
    image: 'algarrobo.jpg',
    price: '$18000',
    description: 'Virola de acero inoxidable, interior 100% calabaza.',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMate, setSelectedMate] = useState(null);
  
  const handleCloseDetail = () => {
    // Lógica para cerrar el detalle del mate, como cambiar el estado activo
    setActiveTab('catalog');
  };
  const handleMateClick = (mate) => {
    setSelectedMate(mate);
    setActiveTab('mateDetail');
  };

  const handleBackToCatalog = () => {
    setSelectedMate(null);
    setActiveTab('catalog');
  };

  const sendWhatsAppMessage = (mateName) => {
    const phoneNumber = '2254535060'; // Reemplaza con tu número de WhatsApp
    const message = `Quiero ${mateName}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <img src="logo.png" alt="Logo Capital Matera" className="App-logo" />
          <h1>Capital Matera</h1>
        </div>
      </header>
      
      <nav className="App-nav">
        <button
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Inicio
        </button>
        <button
          className={`nav-button ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveTab('catalog')}
        >
          Catálogo
        </button>
        <button
          className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contacto
        </button>
      </nav>

      <main>
        {activeTab === 'catalog' && (
          <div className="mate-list">
            {mates.map((mate) => (
              <div key={mate.id} className="mate-item" onClick={() => handleMateClick(mate)}>
                <img src={mate.image} alt={mate.name} className="mate-image" />
                <h2 className="mate-name">{mate.name}</h2>
                <p className="mate-price">{mate.price}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'home' && (
          <div className="home-content">
            <h2>Bienvenido a Capital Matera</h2>
            <p>
              En Capital Matera, nos especializamos en ofrecer una amplia gama de mates de alta calidad,
              diseñados para satisfacer los gustos más exigentes. Nuestros productos son cuidadosamente
              seleccionados y fabricados con los mejores materiales para garantizar una experiencia
              auténtica y duradera.
            </p>
            <p>
              Ofrecemos una variedad de estilos, desde mates tradicionales hasta opciones más modernas,
              adaptadas a las necesidades de cada cliente. Explora nuestro catálogo para descubrir nuestras
              colecciones y encontrar el mate perfecto para ti.
            </p>
            <p>
              Para más información, no dudes en{' '}
              <a
                href="#contact"
                onClick={() => setActiveTab('contact')}
              >
                contactarnos
              </a>. 
              Estamos aquí para ayudarte a encontrar el mate ideal y responder cualquier pregunta que puedas tener.
            </p>
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="contact-content">
            <h2>Consulta con Nosotros</h2>
            <p>
              Si tienes alguna consulta o necesitas más información, puedes contactarnos a través de WhatsApp
              haciendo clic en el enlace a continuación. Estaremos encantados de ayudarte.
            </p>
            <a
              href="https://wa.me/2254535060?text=Hola,%20estoy%20interesado%20en%20tu%20producto"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hacer Consulta por WhatsApp
            </a>
          </div>
        )}
       {activeTab === 'mateDetail' && selectedMate && (
  <div className="mate-detail">
    <button className="close-button" onClick={handleCloseDetail} aria-label="Cerrar"></button>
    <div className="mate-detail-container">
      <img src={selectedMate.image} alt={selectedMate.name} className="mate-detail-image" />
      <div className="mate-detail-info">
        <h2 className="mate-name">{selectedMate.name}</h2>
        <p className="mate-price">{selectedMate.price}</p>
        <p className="mate-description">{selectedMate.description}</p>
        <button
          className="want-button"
          onClick={() => sendWhatsAppMessage(selectedMate.name)}
        >
          Lo quiero
        </button>
      </div>
    </div>
  </div>
)}

      </main>

      <footer className="App-footer">
        <p>© 2024 Capital Matera. Todos los derechos reservados.</p>
        <p>Desarrollado por Genaro Scarpato</p>
      </footer>
    </div>
  );
}

export default App;

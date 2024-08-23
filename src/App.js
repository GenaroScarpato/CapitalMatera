import React, { useState } from 'react';
import './App.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const mates = [
  {
    id: 1,
    images: ['imperialVirolaAlpaca.jpg','imperialVirolaAlpaca.jpg','imperialVirolaAlpaca.jpg'],
    name: 'Imperial Virola Alpaca',
    price: '$16000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cerámica.',
  },
  {
    id: 2,
    images: ['imperialBlanco.jpg','imperialBlanco.jpg','imperialBlanco.jpg','imperialBlanco.jpg'],
    name: 'Imperial premium',
    price: '$20000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de tela con puntitos.',
  },
  {
    id: 3,
    images: ['imperialBaseBolitasNegro.jpg','imperialBaseBolitasNegro.jpg','imperialBaseBolitasNegro.jpg',],
    name: 'Imperial con base de bolitas',
    price: '$16000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cerámica.',
  },
  {
    id: 4,
    images: ['imperialPremiumBaseBolita.jpg','imperialPremiumBaseBolita.jpg'],
    name: 'Imperial Premium con base de bolitas',
    price: '$16000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cerámica.',
  },
  {
    id: 5,
    images: ['imperial.jpg'],
    name: 'Imperial negro',
    price: '$15000',
    description: 'Virola de alpaca, interior 100% calabaza y exterior de cuero.',
  },
  {
    id: 6,
    images: ['camioneroVirolaAcero.jpg'],
    name: 'Camionero',
    price: '$22000',
    description: 'Virola de acero, interior 100% calabaza y exterior de cuero labrado.',
  },
  {
    id: 7,
    name: 'Algarrobo',
    images: ['algarrobo.jpg'],
    price: '$18000',
    description: 'Virola de acero inoxidable, interior 100% calabaza.',
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  adaptiveHeight: true,
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMate, setSelectedMate] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleMateClick = (mate) => {
    setSelectedMate(mate);
    setActiveTab('mateDetail');
  };

  const handleCloseDetail = () => {
    setSelectedMate(null);
    setActiveTab('catalog');
  };

  const handleQuantityChange = (mateId, change) => {
    setQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[mateId] || 0) + change;
      return {
        ...prevQuantities,
        [mateId]: Math.max(newQuantity, 0),
      };
    });
  };

  const addToCart = (mate) => {
    setCart(prevCart => {
      const existingMate = prevCart.find(item => item.id === mate.id);
      if (existingMate) {
        return prevCart.map(item =>
          item.id === mate.id
            ? { ...item, quantity: (item.quantity || 0) + (quantities[mate.id] || 0) }
            : item
        );
      }
      return [...prevCart, { ...mate, quantity: quantities[mate.id] || 0 }];
    });
    setQuantities(prevQuantities => ({ ...prevQuantities, [mate.id]: 0 }));
  };

  const removeFromCart = (mateId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== mateId));
  };

  /*const sendWhatsAppMessage = (mateName) => {
    const phoneNumber = '2254535060'; // Reemplaza con tu número de WhatsApp
    const message = `Quiero ${mateName}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };*/
  const sendWhatsAppMessage = (cart) => {
    const phoneNumber = '2254535060'; // Reemplaza con tu número de WhatsApp
    const message = cart.map(item => `- ${item.name}: ${item.quantity} x ${item.price}`).join('\n');
    const finalMessage = `Quiero realizar el siguiente pedido:\n\n${message}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };
  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')); // Convertir el precio a número
      return total + price * item.quantity;
    }, 0);
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
          className={`nav-button ${activeTab === 'mayor' ? 'active' : ''}`}
          onClick={() => setActiveTab('mayor')}
        >
          Armar pedido mayorista
        </button>
        <button
          className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contacto
        </button>
      </nav>

      <main>
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
        {activeTab === 'mayor' && (
          <div className="mayor-content">
            <div className="mate-list">
              {mates.map((mate) => (
                <div key={mate.id} className="mate-item">
                  <img src={mate.images[0]} alt={mate.name} className="mate-image" />
                  <h2 className="mate-name">{mate.name}</h2>
                  <p className="mate-price">{mate.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(mate.id, -1)}>-</button>
                    <span>{quantities[mate.id] || 0}</span>
                    <button onClick={() => handleQuantityChange(mate.id, 1)}>+</button>
                  </div>
                  <button onClick={() => addToCart(mate)}>Agregar al carrito</button>
                </div>
              ))}
            </div>
            <div className="cart">
  <h2>Carrito de Compras</h2>
  {cart.length === 0 ? (
    <p>No hay mates en el carrito.</p>
  ) : (
    <div>
      <ul>
        {cart.map(mate => (
          <li key={mate.id}>
            {mate.name} - {mate.price} x {mate.quantity}
            <button className="delete-button" onClick={() => removeFromCart(mate.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      <h3>Subtotal: ${calculateTotal(cart)}</h3>

      <button onClick={() => sendWhatsAppMessage(cart)}>Enviar pedido por WhatsApp</button>
      </div>
  )}
</div>

          </div>
        )}
        {activeTab === 'catalog' && (
          <div className="mate-list">
            {mates.map((mate) => (
              <div key={mate.id} className="mate-item" onClick={() => handleMateClick(mate)}>
                <img src={mate.images[0]} alt={mate.name} className="mate-image" />
                <h2 className="mate-name">{mate.name}</h2>
                <p className="mate-price">{mate.price}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'mateDetail' && selectedMate && (
          <div className="mate-detail">
            <button className="close-button" onClick={handleCloseDetail} aria-label="Cerrar"></button>
            <div className="mate-detail-container">
              <div className="mate-detail-slider">
                {selectedMate.images && selectedMate.images.length > 1 ? (
                  <Slider {...settings}>
                    {selectedMate.images.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt={`${selectedMate.name} - Imagen ${index + 1}`} className="mate-detail-image" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img src={selectedMate.images[0]} alt={selectedMate.name} className="mate-detail-image" />
                )}
              </div>
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

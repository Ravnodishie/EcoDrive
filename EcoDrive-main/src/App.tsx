import React, { useState, useEffect } from 'react';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passportSeries, setPassportSeries] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [stream, setStream] = useState(null);
  const [videoRef, setVideoRef] = useState(null);
  const [isOrder, setIsOrder] = useState(false);
  const [cars, setCars] = useState([
    { id: 1, brand: 'Toyota', model: 'Camry', number: 'A123AA' },
    { id: 2, brand: 'Honda', model: 'Civic', number: 'B456BB' },
    { id: 3, brand: 'Ford', model: 'Focus', number: 'C789CC' },
  ]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    console.log('Login', username, password);
    setIsOrder(true);
  };

  const handleRegister = () => {
    console.log('Register', username, password, email, passportSeries, passportNumber);
  };

  const handleFaceId = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (stream && videoRef) {
      videoRef.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className="flex justify-center items-center h-screen bg-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">EcoDrive</h1>
        {isOrder ? (
          <div>
            <h2 className="text-lg font-bold mb-4">Предлагаемые авто</h2>
            <ul>
              {cars.map((car) => (
                <li key={car.id}>
                  <p>Марка: {car.brand}</p>
                  <p>Модель: {car.model}</p>
                  <p>Номер: {car.number}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Заказать
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-4">{isLogin ? 'Войти' : 'Зарегистрироваться'}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Имя пользователя
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Пароль
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {!isLogin && (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passportSeries">
                      Серия паспорта
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="passportSeries"
                      type="text"
                      value={passportSeries}
                      onChange={(e) => setPassportSeries(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passportNumber">
                      Номер паспорта
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="passportNumber"
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleFaceId}
                    >
                      Face ID
                    </button>
                    {stream && (
                      <video
                        ref={(ref) => setVideoRef(ref)}
                        autoPlay
                        className="w-full h-64 border rounded mt-4"
                      />
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={isLogin ? handleLogin : handleRegister}
                >
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleToggle}
                >
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
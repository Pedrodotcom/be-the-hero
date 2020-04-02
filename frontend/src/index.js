import React from 'react'; // Realiza a importação do React
import ReactDOM from 'react-dom'; // realiza a importação da integração do React como DOM
import App from './App'; // Importa o arquivo 'App'

ReactDOM.render( // Renderiza um elemento
  <React.StrictMode> {/*component that will throw warnings in the console whenever it detects components with unsafe lifecycle, old ref or context usage*/}
    <App /> {/*seleciona o componente "App"*/}
  </React.StrictMode>,
  document.getElementById('root') // confere o componente "App" à div "root"
);



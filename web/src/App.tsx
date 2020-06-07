import React from 'react';
import './App.css';

//JSX: Sintaxe de HTML dentro do Javascript
/** Conceito de imutabilidade React: O valor das constantes é atribuido sem alterar diretamente o valor original dela */
 /* formato do vetor useState() -> [valor do estado, função p atualizar o valor do estado] const [counter, setCounter] = useState(0) */

 import Routes from './routes';

 function App() {                            
  return (
      <Routes />
  );
}

export default App;

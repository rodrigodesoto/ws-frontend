import logo from './logo.svg';
import './App.css';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
var vlrAtual = 0

function App() {
  const [id,setId] = useState(0);
  const [ticker,setTicker] = useState(0);
  let [vlrAtual,setVlrAtual] = useState(0);
  const [vlrAbertura,setVlrAbertura] = useState(0);
  const [vlrMaior,setVlrMaior] = useState(0);
  const [vlrMenor,setVlrMenor] = useState(0);
  const { lastJsonMessage, sendMessage } = useWebSocket('ws://localhost:3001', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {

      if (lastJsonMessage) {
        let vlrAntigo = vlrAtual;

        vlrAtual = Number.parseFloat(lastJsonMessage.quote.price).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          currency: 'BRL'
        })
        const vAnt = Number.parseFloat(vlrAntigo.replace(',','.')).toPrecision(4);
        const vAtu= Number.parseFloat(vlrAtual.replace(',','.')).toPrecision(4) ;

        // alert(vAtu);
        // alert(vAnt);
        // alert(vAtu > vAnt);

        // if(vAtu > vAnt) {
        //   document.getElementById('fontColor').style.color ='rgba(34,139,34)';
        // }else if( vAtu == vAnt){
        //   document.getElementById('fontColor').style.color ='rgba(0,206,209)';
        // } else{
        //   document.getElementById('fontColor').style.color ='rgba(165,42,42)';
        // }
        const vlrAbertura = Number.parseFloat(lastJsonMessage.quote.open).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          currency: 'BRL'
        })
        const vlrMaior = Number.parseFloat(lastJsonMessage.quote.high).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          currency: 'BRL'
        })
        const vlrMenor = Number.parseFloat(lastJsonMessage.quote.low).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          currency: 'BRL'
        })
        setId(lastJsonMessage.id);
        setTicker(lastJsonMessage.ticker);
        setVlrAtual(vlrAtual);
        setVlrAbertura(vlrAbertura);
        setVlrMaior(vlrMaior);
        setVlrMenor(vlrMenor);
      }
    },
    queryParams: { 'token': '123456' },
    onError: (event) => { console.error(event); },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });
  return (
    <div className="App">
      <header className="App-header">
        <table id="principal" border="1" width="50%" class="table">
          <tr>
            <th>Id</th>
            <th>Código</th>
            <th>Valor atual</th>
            <th>Valor abertura</th>
            <th>Maior valor</th>
            <th>Menor valor</th>
          </tr>
          {/*<tr class="active">*/}
          {/*  <td>{id}</td>*/}
          {/*  <td>{ticker}</td>*/}
          {/*  <td><font id="fontColor">{vlrAtual}</font></td>*/}
          {/*  <td>{vlrAbertura}</td>*/}
          {/*  <td>{vlrMaior}</td>*/}
          {/*  <td>{vlrMenor}</td>*/}
          {/*</tr>*/}
          {adicionaLinha('principal', id, ticker, vlrAtual, vlrAbertura, vlrMaior, vlrMenor)}
        </table>
        {/*<h className="App-link" > {ticker}: R$ {numero} </h>*/}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

//Funcao adiciona uma nova linha na tabela
function adicionaLinha(idTabela, id, ticker, vlrAtual, vlrAbertura, vlrMaior, vlrMenor) {
  var tabela = document.getElementById(idTabela);

  if(tabela && id !== 0) {
    var numeroLinhas = tabela.rows.length;
    var linha = tabela.insertRow(numeroLinhas);
    var celId           = linha.insertCell(0);
    var celTicker       = linha.insertCell(1);
    var celVlrAtual     = linha.insertCell(2);
    var celVlrAbertura  = linha.insertCell(3);
    var celVlrMaior     = linha.insertCell(4);
    var celVlrMenor     = linha.insertCell(5);
    celId.innerHTML = id;
    celTicker.innerHTML =  ticker;
    celVlrAtual.innerHTML =  vlrAtual;
    celVlrAbertura.innerHTML = vlrAbertura;
    celVlrMaior.innerHTML =  vlrMaior;
    celVlrMenor.innerHTML =  vlrMenor;
  }
}

// funcao remove uma linha da tabela
function removeLinha(linha) {
  var i=linha.parentNode.parentNode.rowIndex;
  document.getElementById('tbl').deleteRow(i);
}

export default App;

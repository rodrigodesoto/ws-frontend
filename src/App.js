import logo from './logo.svg';
import './App.css';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';

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
        const vlrAtual = Number.parseFloat(lastJsonMessage.quote.price).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          currency: 'BRL'
        })
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
          {adicionaLinha('principal', id, ticker, vlrAtual, vlrAbertura, vlrMaior, vlrMenor)}
        </table>
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
  var existRow = document.getElementById(id);

  if(tabela && vlrAtual !== 0 && !existRow) {
      var numeroLinhas = tabela.rows.length;
      var linha = tabela.insertRow(numeroLinhas);
      linha.id = id;
      var celId           = linha.insertCell(0);
      var celTicker       = linha.insertCell(1);
      var celVlrAtual     = linha.insertCell(2);
      var celVlrAbertura  = linha.insertCell(3);
      var celVlrMaior     = linha.insertCell(4);
      var celVlrMenor     = linha.insertCell(5);
      celId.innerHTML = id;
      celTicker.innerHTML =  ticker;
      celVlrAtual.innerHTML =  vlrAtual;
      celVlrAtual.id = 'celVlrAtual'+'_'+id
      celVlrAbertura.innerHTML = vlrAbertura;
      celVlrAbertura.id = 'celVlrAbertura'+'_'+id
      celVlrMaior.innerHTML =  vlrMaior;
      celVlrMaior.id = 'celVlrMaior'+'_'+id
      celVlrMenor.innerHTML =  vlrMenor;
      celVlrMenor.id = 'celVlrMenor'+'_'+id
  } else if (existRow) {
    var linha = document.getElementById(id);
    const vAntAtu = Number.parseFloat(linha.childNodes[2].innerHTML.replace(',','.')).toPrecision(4);
    const vAtuAtu= Number.parseFloat(vlrAtual.replace(',','.')).toPrecision(4) ;
    const vAntAbe = Number.parseFloat(linha.childNodes[3].innerHTML.replace(',','.')).toPrecision(4);
    const vAtuAbe= Number.parseFloat(vlrAbertura.replace(',','.')).toPrecision(4) ;
    const vAntMai = Number.parseFloat(linha.childNodes[4].innerHTML.replace(',','.')).toPrecision(4);
    const vAtuMai= Number.parseFloat(vlrMaior.replace(',','.')).toPrecision(4) ;
    const vAntMen = Number.parseFloat(linha.childNodes[5].innerHTML.replace(',','.')).toPrecision(4);
    const vAtuMen= Number.parseFloat(vlrMenor.replace(',','.')).toPrecision(4) ;

    if(vAtuAtu > vAntAtu) {
      document.getElementById('celVlrAtual'+'_'+id).style.color ='rgba(34,139,34)';
    }else if( vAtuAtu == vAntAtu){
      document.getElementById('celVlrAtual'+'_'+id).style.color ='rgba(0,206,209)';
    } else{
      document.getElementById('celVlrAtual'+'_'+id).style.color ='rgba(165,42,42)';
    }

    if(vAtuAbe > vAntAbe) {
      document.getElementById('celVlrAbertura'+'_'+id).style.color ='rgba(34,139,34)';
    }else if( vAtuAbe == vAntAbe){
      document.getElementById('celVlrAbertura'+'_'+id).style.color ='rgba(0,206,209)';
    } else{
      document.getElementById('celVlrAbertura'+'_'+id).style.color ='rgba(165,42,42)';
    }

    if(vAtuMai > vAntMai) {
      document.getElementById('celVlrMaior'+'_'+id).style.color ='rgba(34,139,34)';
    }else if( vAtuMai == vAntMai){
      document.getElementById('celVlrMaior'+'_'+id).style.color ='rgba(0,206,209)';
    } else{
      document.getElementById('celVlrMaior'+'_'+id).style.color ='rgba(165,42,42)';
    }

    if(vAtuMen > vAntMen) {
      document.getElementById('celVlrMenor'+'_'+id).style.color ='rgba(34,139,34)';
    }else if( vAtuMen == vAntMen){
      document.getElementById('celVlrMenor'+'_'+id).style.color ='rgba(0,206,209)';
    } else{
      document.getElementById('celVlrMenor'+'_'+id).style.color ='rgba(165,42,42)';
    }
    linha.childNodes[2].innerHTML =  vlrAtual;
    linha.childNodes[3].innerHTML = vlrAbertura;
    linha.childNodes[4].innerHTML =  vlrMaior;
    linha.childNodes[5].innerHTML =  vlrMenor;
  }
}

// funcao remove uma linha da tabela
function removeLinha(linha) {
  var i=linha.parentNode.parentNode.rowIndex;
  document.getElementById('tbl').deleteRow(i);
}

export default App;

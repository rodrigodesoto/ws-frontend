import logo from './logo.svg';
import './App.css';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';

function App() {
  const [id,setId] = useState(0);
  const [ticker,setTicker] = useState(0);
  const [variacao,setVariacao] = useState(0);
  const [vlrAtual,setVlrAtual] = useState(0);
  const [vlrAbertura,setVlrAbertura] = useState(0);
  const [vlrMaior,setVlrMaior] = useState(0);
  const [vlrMenor,setVlrMenor] = useState(0);
  const [status,setStatus] = useState(0);
  const [atualizacao,setAtualizacao] = useState(0);
  //ws://localhost:3000/
  //wss://ws-server-heroku.herokuapp.com/
  const { lastJsonMessage, sendMessage } = useWebSocket('wss://ws-server-heroku.herokuapp.com/', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {

      if (lastJsonMessage) {
        // alert("lastJsonMessage: "+lastJsonMessage.quote);
        const order = lastJsonMessage.quote.order
        const variacao = lastJsonMessage.quote.marketChange
        const vlrAtual = lastJsonMessage.quote.price
        const vlrAbertura = lastJsonMessage.quote.open
        const vlrMaior = lastJsonMessage.quote.high
        const vlrMenor = lastJsonMessage.quote.low
        const status = lastJsonMessage.quote.stateTrading
        const atualizacao = lastJsonMessage.quote.timeTrading
        setId(order);
        setTicker(lastJsonMessage.ticker);
        setVariacao(variacao);
        setVlrAtual(vlrAtual);
        setVlrAbertura(vlrAbertura);
        setVlrMaior(vlrMaior);
        setVlrMenor(vlrMenor);
        setStatus(status);
        setAtualizacao(atualizacao);
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
        <table id="principal" border="1" width="80%" class="table">
          <tr>
            <th>Ordem</th>
            <th>Código</th>
            <th>%</th>
            <th>Valor atual</th>
            <th>Valor abertura</th>
            <th>Maior valor</th>
            <th>Menor valor</th>
            <th>Status</th>
            <th>Atualização</th>
          </tr>
          {adicionaLinha('principal', id, ticker, variacao, vlrAtual, vlrAbertura, vlrMaior, vlrMenor, status, atualizacao)}
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
function adicionaLinha(idTabela, id, ticker, variacao, vlrAtual, vlrAbertura, vlrMaior, vlrMenor, status, atualizacao) {
  var tabela = document.getElementById(idTabela);
  var existRow = document.getElementById(id);

  if(tabela && vlrAtual !== 0 && !existRow) {
      var numeroLinhas = tabela.rows.length;

    if(id === 0 || numeroLinhas === id ){
      var linha = tabela.insertRow(numeroLinhas);
      linha.id = id;
      var celId           = linha.insertCell(0);
      var celTicker       = linha.insertCell(1);
      var celVariacao     = linha.insertCell(2);
      var celVlrAtual     = linha.insertCell(3);
      var celVlrAbertura  = linha.insertCell(4);
      var celVlrMaior     = linha.insertCell(5);
      var celVlrMenor     = linha.insertCell(6);
      var celStatus       = linha.insertCell(7);
      var celAtualizacao  = linha.insertCell(8);
      celId.innerHTML = id;
      celTicker.innerHTML =  ticker;
      celVariacao.innerHTML = variacao;
      celVariacao.id = 'celVariacao'+'_'+id
      celVlrAtual.innerHTML =  vlrAtual;
      celVlrAtual.id = 'celVlrAtual'+'_'+id
      celVlrAbertura.innerHTML = vlrAbertura;
      celVlrAbertura.id = 'celVlrAbertura'+'_'+id
      celVlrMaior.innerHTML =  vlrMaior;
      celVlrMaior.id = 'celVlrMaior'+'_'+id
      celVlrMenor.innerHTML =  vlrMenor;
      celVlrMenor.id = 'celVlrMenor'+'_'+id
      celStatus.innerHTML =  status;
      celStatus.id = 'celStatus'+'_'+id
      celAtualizacao.innerHTML =  atualizacao;
      celAtualizacao.id = 'celAtualizacao'+'_'+id
    }
  } else if (existRow) {
    var linha = document.getElementById(id);
    const atualizacaoAnt= linha.childNodes[8]!=null?linha.childNodes[8].innerHTML.toString():'';
    // const isDateAnt = isData(atualizacaoAnt)
    // const isDateAtu = isData(atualizacao)

    // alert("isDateAnt: "+isDateAnt);
    // alert("isDateAtu: "+isDateAtu);
    // alert("Ação: "+linha.childNodes[1].innerHTML.toString()+", atualizacaoAnt: "+atualizacaoAnt+", atualizacao: "+atualizacao);
    // alert("atualizacao: "+atualizacao);
    // alert("atualizacaoAnt.length: "+atualizacaoAnt.length);
    // alert("atualizacao.length: "+atualizacao.length);

    const moment = require('moment');
    const timeAnt = moment(atualizacaoAnt, "HH:mm");
    const timeAtu = moment(atualizacao, "HH:mm");

    // if(atualizacao === null){
    //   alert("atualizacao: "+atualizacao+", timeAtu: "+timeAtu);
    //   atualizacao='';

    // }

    // if(atualizacaoAnt === null){
    //   alert("atualizacaoAnt: "+atualizacaoAnt+", timeAnt: "+timeAnt);
    // }
    
    if(atualizacao != null && atualizacaoAnt != null && timeAnt != NaN && timeAtu != NaN) {
      // alert("atualizacao: "+atualizacao+", timeAtu: "+timeAtu+"atualizacaoAnt: "+atualizacaoAnt+", timeAnt: "+timeAnt);
      if ((timeAtu > timeAnt) || (atualizacaoAnt.length > 1 && atualizacao.length === 0) || (atualizacaoAnt.length === 0 && atualizacao.length > 1)) {
        const vAntVar = Number.parseFloat(linha.childNodes[2] === null ? '' : linha.childNodes[2].innerHTML.replace(',','.')).toPrecision(4);
        const vAtuVar = Number.parseFloat(variacao === null ? '' : variacao.replace(',','.')).toPrecision(4) ;
        const vAntAtu = Number.parseFloat(linha.childNodes[3] === null ? '' : linha.childNodes[3].innerHTML.replace(',','.')).toPrecision(4);
        const vAtuAtu= Number.parseFloat(vlrAtual=== null ? '' :vlrAtual.replace(',','.')).toPrecision(4) ;
        const vAntAbe = Number.parseFloat(linha.childNodes[4] === null ? '' : linha.childNodes[4].innerHTML.replace(',','.')).toPrecision(4);
        const vAtuAbe= Number.parseFloat(vlrAbertura=== null ? '' :vlrAbertura.replace(',','.')).toPrecision(4) ;
        const vAntMai = Number.parseFloat(linha.childNodes[5] === null ? '' : linha.childNodes[5].innerHTML.replace(',','.')).toPrecision(4);
        const vAtuMai= Number.parseFloat(vlrMaior=== null ? '' :vlrMaior.replace(',','.')).toPrecision(4) ;
        const vAntMen = Number.parseFloat(linha.childNodes[6] === null ? '' : linha.childNodes[6].innerHTML.replace(',','.')).toPrecision(4);
        const vAtuMen= Number.parseFloat(vlrMenor=== null ? '' :vlrMenor.replace(',','.')).toPrecision(4) ;
    
    
        const objValVar = document.getElementById('celVariacao'+'_'+id);
        if(vAtuVar > 0) {
          objValVar.style.color ='rgb(34,139,34)';
        }else if(vAtuVar == 0){
          objValVar.style.color ='rgb(0,206,209)';
        }else if (vAtuVar < 0) {
          objValVar.style.color ='rgb(165,42,42)';
        }
    
        const objValAtu = document.getElementById('celVlrAtual'+'_'+id);
        if(vAtuAtu > vAntAtu) {
          objValAtu.style.color ='rgb(34,139,34)';
        }else if( (vAtuAtu == vAntAtu) && (objValAtu.style.color != 'rgb(34, 139, 34)' && objValAtu.style.color != 'rgb(165, 42, 42)')){
          objValAtu.style.color ='rgb(0,206,209)';
        }else if (vAtuAtu < vAntAtu) {
          objValAtu.style.color ='rgb(165,42,42)';
        }
    
        const objValAbe = document.getElementById('celVlrAbertura'+'_'+id);
        if(vAtuAbe > vAntAbe) {
          objValAbe.style.color ='rgb(34,139,34)';
        }else if( (vAtuAbe == vAntAbe) && (objValAbe.style.color != 'rgb(34, 139, 34)' && objValAbe.style.color != 'rgb(165, 42, 42)')){
          objValAbe.style.color ='rgb(0,206,209)';
        }else if (vAtuAbe < vAntAbe) {
          objValAbe.style.color ='rgb(165,42,42)';
        }
    
        const objValMai = document.getElementById('celVlrMaior'+'_'+id);
        if(vAtuMai > vAntMai) {
          objValMai.style.color ='rgb(34,139,34)';
        }else if( (vAtuMai == vAntMai) && (objValMai.style.color != 'rgb(34, 139, 34)' && objValMai.style.color != 'rgb(165, 42, 42)')){
          objValMai.style.color ='rgb(0,206,209)';
        }else if (vAtuMai < vAntMai) {
          objValMai.style.color ='rgb(165,42,42)';
        }
    
        const objValMen = document.getElementById('celVlrMenor'+'_'+id);
        if(vAtuMen > vAntMen) {
          objValMen.style.color ='rgb(34,139,34)';
        }else if( (vAtuMen == vAntMen) && (objValMen.style.color != 'rgb(34, 139, 34)' && objValMen.style.color != 'rgb(165, 42, 42)')){
          objValMen.style.color ='rgb(0,206,209)';
        }else if (vAtuMen < vAntMen) {
          objValMen.style.color ='rgb(165,42,42)';
        }
    
        linha.childNodes[2].innerHTML =  variacao;
        linha.childNodes[3].innerHTML =  vlrAtual;
        linha.childNodes[4].innerHTML = vlrAbertura;
        linha.childNodes[5].innerHTML =  vlrMaior;
        linha.childNodes[6].innerHTML =  vlrMenor;
        linha.childNodes[7].innerHTML =  status;
        linha.childNodes[8].innerHTML =  atualizacao;
      }
    }
  }
}

// funcao remove uma linha da tabela
function removeLinha(linha) {
  var i=linha.parentNode.parentNode.rowIndex;
  document.getElementById('tbl').deleteRow(i);
}

function isData(input) {
  // Define a expressão regular para procurar o caractere "/"
  const regex = /\//;
  
  // Testa se a string contém o caractere "/"
  return regex.test(input);
}

export default App;

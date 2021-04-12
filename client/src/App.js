import axios from 'axios'

const SERVER = 'http://localhost:8080';
function App() {
  const jsonpRequest = () => {
    const randomJSONP = Math.random().toString(16).slice(2, 8);
    const scriptElement = document.createElement('script');
    window[`jsonp${randomJSONP}`] = (res) => {
      console.log(res);
      delete window[`jsonp${randomJSONP}`];
      document.body.removeChild(scriptElement)
    }
    scriptElement.src = `${SERVER}/jsonp?callback=jsonp${randomJSONP}`;
    document.body.appendChild(scriptElement);

  }
  const corsSimpleRequest = () => {
    axios({
      url: `${SERVER}/corsSimple`,
      method: 'get'
    })
  }
  const corsComplexRequest = () => {
    axios({
      url: `${SERVER}/corsComplex`,
      method: 'put'
    })
  }
  const fetchRequest = () => {
    fetch(`${SERVER}/fetch`)
  }
  const fetchNoCorsGetRequest = () => {
    fetch(`${SERVER}/fetch`, {
      mode: 'no-cors',
      credentials: "include"
    })
  }
  const fetchNoCorsPutRequest = () => {
    fetch(`${SERVER}/fetch`, {
      method: 'put',
      mode: 'no-cors',
      credentials: "include"
    })
  }
  const fetchCorsPutRequest = () => {
    fetch(`${SERVER}/fetch`, {
      method: 'put',
      mode: 'cors',
      credentials: "include"
    })
  }
  return (
    <div className="App">
      <section>
        <h2>
          jsonp
        </h2>
        <button onClick={jsonpRequest}>jsonp request</button>
      </section>
      <section>
        <h2>
          cors
        </h2>
        <button onClick={corsSimpleRequest}>cors simple request</button>
        <button onClick={corsComplexRequest}>cors complex request</button>
      </section>
      <section>
        <h2>
          fetch
        </h2>
        <button onClick={fetchRequest}>fetch</button>
        <button onClick={fetchNoCorsGetRequest}>fetch no-cors get</button>
        <button onClick={fetchNoCorsPutRequest}>fetch no-cors put</button>
        <button onClick={fetchCorsPutRequest}>fetch cors put</button>
      </section>
    </div>
  );
}

export default App;

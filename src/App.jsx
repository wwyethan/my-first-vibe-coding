import MatrixRain from './components/MatrixRain'
import About from './components/About'
import Skills from './components/Skills'
import './App.css'

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <About />
      <Skills />
      <footer className="footer">
        <p>Made with ❤️ by HeavySniper</p>
      </footer>
    </div>
  )
}

export default App

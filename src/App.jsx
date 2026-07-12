import MatrixRain from './components/MatrixRain'
import About from './components/About'
import Skills from './components/Skills'
import SummerPlan from './components/SummerPlan'
import './App.css'

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <About />
      <Skills />
      <SummerPlan />
      <footer className="footer">
        <p>Made with ❤️ by HeavySniper</p>
      </footer>
    </div>
  )
}

export default App

import { Component, StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./style/index.css"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#D5CCCD] text-[#291B48] p-8">
          <div className="max-w-xl w-full p-6 border-2 border-[#5E87B6] rounded-2xl bg-[#D5CCCD] shadow-lg space-y-4">
            <h2 className="text-2xl font-black text-[#291B48] uppercase">Application Error</h2>
            <p className="text-sm font-mono text-[#291B48]/80 bg-[#9FB2C8]/30 p-4 rounded-lg overflow-auto">
              {this.state.error?.toString()}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#291B48] text-[#D5CCCD] rounded-full font-bold text-xs uppercase hover:bg-[#5E87B6] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)

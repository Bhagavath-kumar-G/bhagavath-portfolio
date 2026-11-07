import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './context/useTheme'
import DotField from './components/DotField'
import HangingLampCord from './components/HangingLampCord'
import AmbientSpotlight from './components/AmbientSpotlight'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import ConnectCta from './components/ConnectCta'
import Footer from './components/Footer'

function PortfolioContent() {
  const { isDark } = useTheme()

  // Theme-aware palette according to ink-wash specifications:
  // Dark theme: gradientFrom="#777777", gradientTo="#D6D3CB", glowColor="#F2F0E9", lightMode=false
  // Light theme: gradientFrom="#8A857A", gradientTo="#55534E", glowColor="#171717", lightMode=true
  const gradientFrom = isDark ? '#777777' : '#8A857A'
  const gradientTo = isDark ? '#D6D3CB' : '#55534E'
  const glowColor = isDark ? '#F2F0E9' : '#171717'

  return (
    <div className="min-h-screen bg-[#171717] dark:bg-[#171717] light:bg-[#F7F6F2] text-[#F2F0E9] dark:text-[#F2F0E9] light:text-[#171717] font-sans selection:bg-[#C8C4B8] selection:text-[#171717] relative transition-colors duration-400">
      {/* Continuous Full-Page DotField Background (Fixed viewport canvas, behind all content) */}
      <DotField
        pattern="grid"
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={180}
        bulgeStrength={-0.15}
        glowRadius={130}
        glowIntensity={0.35}
        gradientAngle={97}
        baseOpacity={0.10}
        waveAmplitude={0}
        sparkle={false}
        speed={1}
        interactive={true}
        holdToZoom={false}
        intro={true}
        opacity={0.8}
        maxDevicePixelRatio={1.5}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        glowColor={glowColor}
        lightMode={!isDark}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Foreground Content with interactive elements preserved */}
      <div className="relative z-10">
        <AmbientSpotlight />
        <HangingLampCord />
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Journey />
          <Contact />
          <ConnectCta />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}

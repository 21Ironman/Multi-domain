import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Ecommerce from './pages/Ecommerce';
import Healthcare from './pages/Healthcare';
import Streaming from './pages/Streaming';
import AiAgent from './pages/AiAgent';
import Banking from './pages/Banking';
import ChatBot from './components/chatbot/ChatBot';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3,  } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2,  } },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/ecommerce" element={<PageWrapper><Ecommerce /></PageWrapper>} />
        <Route path="/healthcare" element={<PageWrapper><Healthcare /></PageWrapper>} />
        <Route path="/streaming" element={<PageWrapper><Streaming /></PageWrapper>} />
        <Route path="/ai-agent" element={<PageWrapper><AiAgent /></PageWrapper>} />
        <Route path="/banking" element={<PageWrapper><Banking /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
        <ChatBot />
      </Layout>
    </Router>
  );
}

export default App;

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoOrange from '../assets/LogoOrange.svg';
import LoginOrange from "../assets/LoginOrange.png";
import Food from "../assets/Food.png"
import Spices from "../assets/Spices.png"
import Tomato from "../assets/Tomato.png"
import { useAuthStore } from '../hooks/auth/useauth';
import { ACCESS_TOKEN } from '../api/constants';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { login, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Check authentication status on mount and changes
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && isAuthenticated && !isLoading) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      const result = await login({ email, password });
      if (result) {
        navigate('/home', { replace: true });
      }
    } catch (error: any) {
      console.error('Login failed:', error);
    }
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);

    setTimeout(() => {
      navigate('/register');
    }, 300);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/privacy');
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/terms');
  };

  const Footer = () => {
    return (
      <footer className="w-full py-4 text-sm text-[#6b6b6b] border-t mt-12">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[#6b6b6b]">&copy; 2025 — 2026</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrivacyClick}
              className="text-[#FF5300] hover:underline"
            >
              Privacy
            </button>
            <span className="text-[#6b6b6b]">|</span>
            <button
              type="button"
              onClick={handleTermsClick}
              className="text-[#FF5300] hover:underline"
            >
              Terms
            </button>
          </div>
        </div>
      </footer>
    );
  };

  // Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen flex w-full overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Left Side - Login Form */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-32"
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
        >
          <div className="w-[460px]">
            <motion.div variants={itemVariants}>
              <Link to="/">
                <img src={logoOrange} alt="HapagTech logo" className="cursor-pointer w-8"/>
              </Link>
            </motion.div>
            
            <motion.h2
              className="text-5xl font-extrabold text-[#FF5300] mb-4 mt-4"
              variants={itemVariants}
            >
              Log in.
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 mb-6"
              variants={itemVariants}
            >
              Welcome back! Please log in to your account.
            </motion.p>
            
            <motion.form
              className="space-y-4"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-base font-medium mb-0.5">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5300]/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </motion.div>
             
              <motion.div className="relative" variants={itemVariants}>
                <label htmlFor="password" className="block text-base font-medium mb-0.5">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5300]/60 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                </button>
              </motion.div>
             
              <motion.button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#FF5300] text-white font-medium hover:bg-[#e64a00] transition-colors"
                variants={itemVariants}
              >
                Login
              </motion.button>
            </motion.form>

            <motion.div className="mt-6 text-center text-sm text-[#6b6b6b]" variants={itemVariants}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleSignUpClick}
                className="text-[#FF5300] font-medium hover:underline"
              >
                Sign up
              </button>
            </motion.div>

            <Footer />
          </div>
        </motion.div>

        {/* Right Side - Images */}
        <motion.div
          className="hidden md:flex md:w-1/2 relative items-center justify-center overflow-hidden bg-[#FFF5EF]"
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
        >
          <motion.img
            src={LoginOrange}
            alt="Login Orange"
            className="absolute top-10 left-10 w-48 h-48 object-cover rounded-3xl shadow-lg"
            variants={itemVariants}
          />
          <motion.img
            src={Food}
            alt="Food"
            className="absolute top-20 right-16 w-40 h-40 object-cover rounded-3xl shadow-lg"
            variants={itemVariants}
          />
          <motion.img
            src={Spices}
            alt="Spices"
            className="absolute bottom-20 left-16 w-36 h-36 object-cover rounded-3xl shadow-lg"
            variants={itemVariants}
          />
          <motion.img
            src={Tomato}
            alt="Tomato"
            className="absolute bottom-16 right-10 w-44 h-44 object-cover rounded-3xl shadow-lg"
            variants={itemVariants}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
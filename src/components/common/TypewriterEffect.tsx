'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypewriterEffect = () => {
  const phrases = [
    'Bienvenido a mi portafolio',
    'Soy Ingeniero Informático',
    'Mi nombre es Wilson Tumiña'
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState('');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const targetPhrase = phrases[currentPhraseIndex];
    
    if (isTyping) {
      if (text.length < targetPhrase.length) {
        // Typing: 90ms por letra
        timeout = setTimeout(() => {
          setText(targetPhrase.slice(0, text.length + 1));
        }, 90);
      } else {
        // Pausa de 500ms al finalizar de escribir, luego inicia el fade out
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 500);
      }
    } else {
      // Fade out dura 400ms, esperamos ese tiempo y cambiamos de frase
      timeout = setTimeout(() => {
        setText('');
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }, 400); 
    }
    
    return () => clearTimeout(timeout);
  }, [text, isTyping, currentPhraseIndex]); // phrases is constant, so omitting it from dep array or defining inside is fine

  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: isTyping ? 1 : 0 }}
      transition={{ duration: 0.4 }} // 400ms fade out
      className="inline-flex items-center min-h-[1.2em]"
    >
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="inline-block w-[3px] h-[1em] bg-amber-400 ml-1 sm:ml-2"
        style={{ verticalAlign: 'text-bottom' }}
      />
    </motion.span>
  );
};

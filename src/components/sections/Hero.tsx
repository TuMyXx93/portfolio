'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="h-screen flex-center flex-col space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex-center flex-col"
      >
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src="/images/profile.png"
            alt="Profile picture"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-gradient">Tumidev</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-400 text-center mt-4">
          Desarrollador Web Full Stack
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-4"
      >
        <a href="#projects" className="hero-button">
          Ver Proyectos
        </a>
        <a href="#contact" className="hero-button">
          Contactar
        </a>
      </motion.div>
    </section>
  )
}
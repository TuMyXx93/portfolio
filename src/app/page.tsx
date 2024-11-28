'use client';

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-scroll z-0">
      {/* Header */}
      <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center"
        >
          <Image
            src="/images/logo.png"
            alt="Tumidev Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="snap-start">
        <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              scale: [1, 2, 2, 3, 1],
              opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
              borderRadius: ["20%", "20%", "50%", "80%", "20%"],
            }}
            transition={{
              duration: 2.5,
            }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute border border-[#333333] rounded-full h-[200px] w-[200px] mt-52 animate-ping" />
            <div className="absolute border border-[#333333] rounded-full h-[300px] w-[300px] mt-52" />
            <div className="absolute border border-[#333333] rounded-full h-[500px] w-[500px] mt-52" />
            <div className="absolute border border-[#F7AB0A] opacity-20 rounded-full h-[650px] w-[650px] mt-52 animate-pulse" />
            <div className="absolute border border-[#333333] rounded-full h-[800px] w-[800px] mt-52" />
          </motion.div>

          <div className="z-20">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: 1.2
              }}
              className="relative mx-auto h-32 w-32 mb-8"
            >
              <Image
                src="/images/profile.png"
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
                priority
              />
            </motion.div>
            <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
              Desarrollador Web
            </h2>
            <h1 className="text-5xl lg:text-6xl font-semibold px-10">
              <span className="mr-3">Bienvenido a mi portafolio</span>
            </h1>

            <div className="pt-5">
              <button className="hero-button">Sobre mí</button>
              <button className="hero-button">Experiencia</button>
              <button className="hero-button">Habilidades</button>
              <button className="hero-button">Proyectos</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

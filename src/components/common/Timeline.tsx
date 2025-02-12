'use client'
import { motion } from 'framer-motion'

interface TimelineItem {
  date: string
  title: string
  description: string
  company?: string
  technologies?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-600" />
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative flex items-center justify-between mb-8 ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
            <h3 className="text-xl font-bold text-[#F7AB0A]">{item.title}</h3>
            {item.company && (
              <p className="text-gray-400 text-sm mb-2">{item.company}</p>
            )}
            <p className="text-gray-300">{item.description}</p>
            {item.technologies && (
              <div className="flex flex-wrap gap-2 mt-2 justify-end">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#F7AB0A]" />
          </div>
          <div className={`w-5/12 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
            <span className="text-gray-500 font-mono">{item.date}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
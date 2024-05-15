'use client'
import Link from 'next/link'
import React from 'react'

const ProjectCard = ({project}) => {
    const linkStyle = {
        padding: '1rem',
        borderLeft: `4px solid ${project.color}`,
        transition: 'all .3s',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit'
    }
    const colorBarStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '6px',
        backgroundColor: project.color,
        transition: 'all .3s'
    }
  return (
        <Link
        href={`/dashboard/project/${project.id}`}
        className='border hover:shadow-md'
        style={linkStyle}
        >
            <div
            style={colorBarStyle}/>
            <div className='flex w-full'>
                <div className='flex justify-between items-center w-full'>
                <span>{project.name}</span>
                <span
                className='flex flex-col items-center'
                >
                    {project.tasks.length}
                    <span className='text-xs font-light'>Total Task</span>
                </span>
                </div>
            </div>
        
        </Link>
  )
}

export default ProjectCard
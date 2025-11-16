'use client'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type Props = {
  name?: string
  options: string[]
  register: UseFormRegister<any>
}

export default function CheckboxGroup({ name = 'services', options, register }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt, idx) => (
        <label key={opt} className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register(`${name}.${idx}`)} className="w-4 h-4" />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  )
}

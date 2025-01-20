import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'



const NotesSelect = ({ control, name, label,noteData }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            options={noteData.map((note) => ({
              value: note._id,
              label: note.name,
            }))}
            isMulti            
            className="w-full mt-1"
          />
        )}
      />
    </div>
  )
}

export default NotesSelect


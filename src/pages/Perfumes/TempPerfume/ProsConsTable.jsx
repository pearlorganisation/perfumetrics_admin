import React from 'react'
import { useFieldArray } from 'react-hook-form'


const ProsConsTable = ({ control }) => {
  const { fields: prosFields, append: appendPros, remove: removePros } = useFieldArray({
    control,
    name: "pros"
  });

  const { fields: consFields, append: appendCons, remove: removeCons } = useFieldArray({
    control,
    name: "cons"
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Pros</h2>
        {prosFields.map((field, index) => (
          <div key={field.id} className="flex mb-2">
            <input
              {...control.register(`pros.${index}.title`, { required: true })}
              className="flex-grow p-2 border rounded mr-2"
            />
            <button type="button" onClick={() => removePros(index)} className="p-2 bg-red-500 text-white rounded">
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendPros({ title: '' })}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Pro
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Cons</h2>
        {consFields.map((field, index) => (
          <div key={field.id} className="flex mb-2">
            <input
              {...control.register(`cons.${index}.title`, { required: true })}
              className="flex-grow p-2 border rounded mr-2"
            />
            <button type="button" onClick={() => removeCons(index)} className="p-2 bg-red-500 text-white rounded">
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendCons({ title: '' })}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Con
        </button>
      </div>
    </div>
  )
}

export default ProsConsTable


import React from 'react'
import { useFieldArray } from 'react-hook-form'



const AccordsTable = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accords"
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Main Accords</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Percentage</th>
            <th>Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <input
                  {...control.register(`accords.${index}.name`, { required: true })}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <input
                  {...control.register(`accords.${index}.percentage`, { required: true, min: 0, max: 100 ,type:Number })}
                  type="number"
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <input
                  {...control.register(`accords.${index}.color`, { required: true })}
                  type="color"
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => append({ name: '', percentage: 0, color: '#000000' })}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Add Accord
      </button>
    </div>
  )
}

export default AccordsTable


import React from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import Select from 'react-select';

const PurchaseLinksTable = ({ control, countryISOData, brandLinkedImages }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'purchaseLinks',
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Purchase Links</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Link</th>
            <th>Company</th>
            <th>Country</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <input
                  type="url"
                  {...control.register(`purchaseLinks.${index}.link`, { required: true })}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                {/* Using Controller for react-select */}
                <Controller
                  name={`purchaseLinks.${index}.company`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={brandLinkedImages.map((el) => ({
                        label: el.brand,
                        value: { imageUrl: el.imageUrl, companyName: el.brand },
                      }))}
                      className="w-full"
                    />
                  )}
                />
              </td>
              <td>
                {/* Using Controller for react-select */}
                <Controller
                  name={`purchaseLinks.${index}.country`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countryISOData}
                      className="w-full"
                    />
                  )}
                />
              </td>
              <td>
                <input
                  type="text"
                  {...control.register(`purchaseLinks.${index}.price`, { required: true })}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => append({ link: '', company: '', country: '', price: '' })}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Add Purchase Link
      </button>
    </div>
  );
};

export default PurchaseLinksTable;

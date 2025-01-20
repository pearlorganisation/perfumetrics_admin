import React from 'react'



const ImageUpload=  ({ label, onChange, multiple = false, accept = 'image/*',required=false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        onChange={(e) => e.target.files && onChange(e.target.files)}
        multiple={multiple}
        accept={accept}
        required = {required}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  )
}

export default ImageUpload


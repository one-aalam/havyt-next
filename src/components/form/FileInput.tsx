import { useState } from 'react'
import { useS3Upload } from 'next-s3-upload'
import { useFormContext } from 'react-hook-form'

type Props = {
    imageUrlKey?: string
}

export default function FileInput({ imageUrlKey = 'imageUrl' }: Props) {
  const { getValues, setValue } = useFormContext();
  const [ imageUrl, setImageUrl] = useState(getValues()[imageUrlKey])
  const [ uploading, setUploading ] = useState(false)
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  const handleFileChange = async file => {
    setUploading(true)
    let { url } = await uploadToS3(file)
    setImageUrl(url)
    setValue(imageUrlKey, url)
    setUploading(false)
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />
      <div className="p-2 bg-cover card bg-gray-100 relative h-64">
        <button className={`btn btn-sm absolute bottom-4 right-2 ${ uploading && 'loading'}`} role="button" aria-pressed="true" onClick={(evt) => {
            evt.preventDefault()
            openFileDialog()
        }}>{uploading ? 'Updating Image' : imageUrl ? 'Update Image' : 'Add Image'}</button>
        {imageUrl && <img className="border-2 border-gray-200 h-full mx-auto" src={imageUrl} />}
        </div>
    </div>
  );
}

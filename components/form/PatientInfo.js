import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase';

function PatientInfo({formData, setFormData}) {

  const [frontFile, setfrontFile] = useState();
  const [progress1, setProgress1] = useState(0);
  const imageHandler = (e) => {
    setfrontFile(e.target.files[0]);
   
}
  useEffect(() => {
    const uploadFrontFile = () => {
      const storageRef = ref(storage, frontFile.name );
      const uploadTask = uploadBytesResumable(storageRef, frontFile);

      uploadTask.on("state_changed", (snapshot) => {
        const newProgress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress1(newProgress1);
        switch(snapshot.state) {
          case "paused":
           
            break;
            case "running": 
            
            break;
            default:
              break;
        }
      
      },(error) => {

        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrL)  =>
        {
          
          setFormData((formData) => ({...formData, imageUrl: downloadUrL}));

        });
      } );
    }
frontFile && uploadFrontFile();
  },[frontFile])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    
    }))
      }



  return (

    



    <div>
    

  

      <div className="sm:mt-0">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          
          <div className="mt-5 md:col-span-1 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className='grid grid-cols-12 gap-6 mb-4'>
                  <div className="col-span-12 sm:col-span-2 text-center">
  <label className="block text-sm font-medium text-gray-700">Item Picture</label>
  <div className={`mt-1 flex justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6  relative ${formData.imageUrl ? 'border-green-500' : 'border-primary'}`}>
    
    <div className="space-y-1">
      <img className='h-32' src={formData.imageUrl ? formData.imageUrl : '/formPiks/fSmile.jpg'} />
      <div className="flex text-sm text-gray-600 justify-center">
        <label className="relative cursor-pointer rounded-md bg-primary px-2 py-1 text-white font-medium hover:bg-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 hover:text-white">
          <span>Upload</span>
          <input id="spsFile" name="sps file" type="file" className="sr-only" onChange={imageHandler} />
        </label>
      </div>
      <p className='text-xs font-bold'>{formData.imageUrl ? "File Uploaded" : "No File Uploaded"}</p>
      {progress1 > 1 ?<div>  <div className="mt-1">
              <progress className="w-full h-2" value={progress1} max="100" />
            </div> </div> : null }
      
    </div>
  </div>
</div>

                  
                  </div>
                  <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Order Number
                      </label>
                      <input
                      required
                       onChange={onChange}
                      value={formData.orderNumber}
                        type="text"
                        name="orderNumber"
                        id="orderNumber"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Order Details
                      </label>
                      <input
                      required
                       onChange={onChange}
                      value={formData.orderName}
                        type="text"
                        name="orderName"
                        id="orderName"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                      onChange={onChange}
                      value={formData.address}
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                  

                    <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                      onChange={onChange}
                      value={formData.phoneNumber}
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      City 
                      </label>
                      <input
                      onChange={onChange}
                      value={formData.lat}
                        type="text"
                        name="lat"
                        id="lat"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Street
                      </label>
                      <input
                      onChange={onChange}
                      value={formData.long}
                        type="text"
                        name="long"
                        id="long"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                   
                  </div>
                </div>
              
              </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientInfo

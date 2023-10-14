import React, { useState } from 'react'
import { TextField, FormControl, FormLabel, Button } from '@mui/material';
import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"

const ListingCreationPage = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')
  const [hours, setHours] = useState('')
  const [rate, setRate] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedImageURL, setUploadedImageURL] = useState("https://www.westend61.de/images/0001441625pw/aerial-view-of-cars-parked-in-outdoor-parking-lot-KNTF05253.jpg")


  function onChange(e, setter) {
    setter(e.target.value)
  }

  function submitListing(e) {
    console.log(uploadedImage)
    if (name == '' || address == '' || city == '' || state == '' || zipCode == '' || country == '' || hours == '' || rate == '' || description == '') {
      alert('Incorrect inputs in fields')
    }
    else {

      let formData = new FormData()
      formData.append('name', name)
      formData.append('address', address)
      formData.append('city', city)
      formData.append('state', state)
      formData.append('zipcode', zipCode)
      formData.append('country', country)
      formData.append('hours', hours)
      formData.append('rate', rate)
      formData.append('available', true)
      formData.append('description', description)
      formData.append('image', uploadedImage)

      // let listing = {
      //   name: name,
      //   address: address,
      //   city: city,
      //   state: state,
      //   zipcode: zipCode,
      //   country: country,
      //   hours: hours,
      //   rate: rate,
      //   available: true,
      //   description: description,
      // }

      fetch('home/post-listing', {
        method: 'POST',
        // headers: {
        //   'Content-type': 'multipart/form-data'
        // },
        body: formData
      })
        .then(res => res.json())
        .then(data => setUploadedImageURL(data))

    }
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <form encType='multipart/form'>
          <FormControl>
            <h1>Create your Listing</h1>
            <FormLabel>Name</FormLabel>
            <TextField placeholder='Wonder Parking' onChange={(e) => onChange(e, setName)}></TextField>
            <FormLabel>Address</FormLabel>
            <TextField placeholder='123 Park ave' onChange={(e) => onChange(e, setAddress)}></TextField>
            <FormLabel>City</FormLabel>
            <TextField placeholder='New York' onChange={(e) => onChange(e, setCity)}></TextField>
            <FormLabel>State</FormLabel>
            <TextField placeholder='NY' onChange={(e) => onChange(e, setState)}></TextField>
            <FormLabel>ZipCode</FormLabel>
            <TextField placeholder='90210' onChange={(e) => onChange(e, setZipCode)}></TextField>
            <FormLabel>Country</FormLabel>
            <TextField placeholder='USA' onChange={(e) => onChange(e, setCountry)}></TextField>
            <FormLabel>Hours</FormLabel>
            <TextField placeholder='8am-8pm' onChange={(e) => onChange(e, setHours)}></TextField>
            <FormLabel>Rate</FormLabel>
            <TextField placeholder='10' onChange={(e) => onChange(e, setRate)}></TextField>
            <FormLabel>Description</FormLabel>
            <TextField fullWidth placeholder='Underground parking connected to mall' onChange={(e) => onChange(e, setDescription)}></TextField>
            <FormLabel>Upload Image</FormLabel>
            <input type='file' onChange={(e) => {
              setUploadedImage(e.target.files[0])
              setUploadedImageURL(URL.createObjectURL(e.target.files[0]))
            }} />
            <Button onClick={submitListing}>Submit</Button>
          </FormControl>
        </form>
        <div style={{ maxWidth: '30%', border: '1px solid lightgrey', padding: '10px', borderRadius: '5px' }}>
          <h2>Parking Lot Image</h2>
          <img width="80%" src={uploadedImageURL} />
        </div>
      </div>
      <Footer />
    </>
  )
}


export default ListingCreationPage;
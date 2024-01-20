import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { formStage, formSignup2 } from '../../store/rootSlice'
import Card from '@mui/material/Card';





function FormUserSignup2({ pageTitle, submitButtonText, previousButton }) {

  // redux
  const dispatch = useDispatch();
  const [country,setCountry] = useState([])


  // get Redux store values for formUserSignup
  const currentStage = useSelector(state => state.FormUserSignup) // for previous button
  const formstageName = useSelector(state=>state.FormUserSignup.name)
  const formstageaddress = useSelector(state => state.FormUserSignup2.address)
  const formstageState = useSelector(state => state.FormUserSignup2.state)
  const formstageCity = useSelector(state => state.FormUserSignup2.city)
  const formstageCountry = useSelector(state => state.FormUserSignup2.country)
  const formstagePin = useSelector(state => state.FormUserSignup2.pincode)
  
  // const formStageAdhaar = useSelector(state => state.FormUserSignup2.adhaar)
  // const formStagePAN = useSelector(state => state.FormUserSignup2.pan)
  

  // form values initial state
  const [formData, setFormData] = useState({
    name:formstageName || "",
    address: formstageaddress || "",
    state: formstageState || "",
    city: formstageCity || "",
    country: formstageCountry || "",
    pincode: formstagePin || "",
    // adhaar: formStageAdhaar || "",
    // pan:formStagePAN  || "",
    
  })
  

  // form values onchange
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }

  // form validation checks
  const [errors, setErrors] = useState({})
  const validate = (formData) => {

    let formErrors = {} // set form errors to none at start

    // name
    if (!formData.address) {
      formErrors.address = "Address required required";
    }
    if (!formData.state) {
      formErrors.state = "state required required";
    }
    if (!formData.city) {
      formErrors.city = "city required required";
    }
    // if (!formData.country) {
    //   formErrors.country = "country required required";
    // }
    const pinRegex = new RegExp(/^[0-9]*$/)
    if (!formData.pincode || !pinRegex.test(formData.pincode)) {
      formErrors.pincode = "Write Numeric Characters only";
    }
    // const ageRegex = new RegExp(/^[0-9]*.?[0-9]+$/)
    // if(!formData.age || !ageRegex.test(formData.age)){
    //   formErrors.age = "Invalid Age"
    // }
    // if(!formData.sex){
    //   formErrors.sex = "Select Any one";
    // }
    // const phoneRegex = new RegExp(/^[6-9]\d{9}$/)
    // if(!formData.phone || !phoneRegex.test(formData.phone)){
    //   formErrors.phone = "Enter a valid Phone number"
    // }
    // const adhaarRegex = new RegExp(/^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)
    // if(!formData.adhaar || !adhaarRegex.test(formData.adhaar)){
    //   formErrors.adhaar="Enter a Valid Adhaar Number"
    // }
    // const panRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    // if(!formData.pan || !panRegex.test(formData.pan)){
    //   formErrors.pan="Enter a Valid PAN Number"
    // }

    // email
    

    return formErrors
  }

  const [isSubmitted, setIsSubmitted] = useState(false) // state for sent status
  // onsubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    setErrors(validate(formData)) // check errors
    setIsSubmitted(true) // update submit status
  }
  
  useEffect(() => {
    const fetchCountries =async ()=>{
      try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        if(!response.ok){
          throw new Error(`HTTO error ! Status: ${response.status}`)
        }
        const data = await response.json();
        setCountry(data)
      }catch(error){
        console.log('Error Fetching data');
      }
    }
    fetchCountries();
    if (Object.keys(errors).length === 0 && isSubmitted) { // chnpm i -g npm-check-updates
      

      // update Redux Slice
      dispatch(
        formStage(3) // update formStage
      )
      dispatch(
        formSignup2({ // update formSignup
          address: formData.address,
          state: formData.state,
          city:formData.city,
          country:formData.country,
          pincode:formData.pincode,
          // adhaar: formData.adhaar,
          // pan:formData.pan,
          
        })
      );
    }

  }, [formData, isSubmitted, dispatch, errors])
  // console.log(errors, formData)

  return (

    <>
      <h2 className="bg-light">{pageTitle || 'Signup'}</h2>

      <div style={{width:'100%',height:'80vh'}} className="bg-light d-flex justify-content-center align-items-center">
        <Card variant="outlined" style={{width:'50%',height:'80vh'}}>
          <form  name="form-signup" id="form-signup" onSubmit={(e) => handleSubmit(e)} >
           <p>
              
              <input type="text" className="form-control"  id="address"  name="address"  
                placeholder="Address"  value={formData.address}  onChange={handleChange}  />
            </p>
            {errors.address && <span className="error-message">{errors.address}</span>}
    
            <p>
              
              <input   type="text"  id="state"  name="state"  autoComplete="role"  aria-label="role"  aria-required="false"
                placeholder="State" className="form-control"  value={formData.state}  onChange={handleChange}  />
            </p>
            {errors.state && <span className="error-message">{errors.state}</span>}
            {/* <p>
              <label>Choose Your Gender : </label>
              <select value={formData.city} onChange={handleChange} name="city" id="city">
                <option></option>
                <option> Male</option>
                <option> Female</option>
                <option> Others</option>


              </select>
            </p>
            {errors.sex && <span className="error-message">{errors.sex}</span>} */}
            <p>
              
              <input   type="text"  id="city"  name="city"  autoComplete="role"  aria-label="role"  aria-required="false"
                placeholder="Enter Your City" className="form-control"  value={formData.city}  onChange={handleChange}  />
            </p>
            {errors.city && <span className="error-message">{errors.city}</span>}
            {/* <p>
              <label htmlFor="mobile"></label>
              <input   type="tel"  id="phone"  name="country"  autoComplete="phone"  aria-label="phone"  aria-required="false"
                placeholder="Enter Your Phone Number" className="form-control"  value={formData.country}  onChange={handleChange}  />
            </p>
            {errors.phone && <span className="error-message">{errors.phone}</span>} */}
            <div>
              <h2>Country List</h2>
              <select value={formData.country} onChange={handleChange} name="country" id="country">
                <option >Select a country</option>
                {country.map((country)=>(
                  <option key={country.cca3} value={country.name.common}>{country.name.common}</option>
                ))}
              </select>
            </div>
            {/* {errors.country && <span className="error-message">{errors.country}</span>} */}
            {/* <p>
              <label>Govt Id type: </label>
              <select name="govttype" id="govttype">
                <option></option>
                <option>Adhaar</option>
                <option>PAN</option>
              </select>
            </p> */}
            <p>
              <input type="tel" name="pincode" placeholder="Enter Your Pincode Number" className="form-control"  value={formData.pincode}  onChange={handleChange}></input>
            </p>
            {errors.pincode && <span className="error-message">{errors.pincode}</span>}
            {/* <p>
              <input type="tel" name="pan" placeholder="Enter Your PAN Number" className="form-control"  value={formData.pan}  onChange={handleChange}></input>
            </p>
            {errors.pan && <span className="error-message">{errors.pan}</span>} */}
            
    
            {/*  */}
    
            <p className="disclaimer-text text-center "><span className="required-asterix"></span> required fields</p>
    
            <div className="btn-array  text-center">
              {(previousButton) &&
                <p>
                  <input  type="submit"  value={`Back`}  onClick={() => dispatch(formStage(currentStage - 1))}
                  />
                </p>
              }
              <p>
                <input  type="submit"  value={submitButtonText || 'Submit'}  />
              </p>
            </div>
    
          </form>
        </Card>
      </div>

    </>

  );

}

export default FormUserSignup2;

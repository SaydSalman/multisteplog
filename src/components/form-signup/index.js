import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { formStage, formSignup } from '../../store/rootSlice'
import Card from '@mui/material/Card';




function FormUserSignup({ pageTitle, submitButtonText, previousButton }) {

  // redux
  const dispatch = useDispatch();

  // get Redux store values for formUserSignup
  const currentStage = useSelector(state => state.FormStage) // for previous button
  const formstageName = useSelector(state => state.FormUserSignup.name)
  const formstageAge = useSelector(state => state.FormUserSignup.age)
  const formstageSex = useSelector(state => state.FormUserSignup.sex)
  const formstagePhone = useSelector(state => state.FormUserSignup.phone)
  const formstageGovtType = useSelector(state => state.FormUserSignup.govttype)
  
  const formStageAdhaar = useSelector(state => state.FormUserSignup.adhaar)
  const formStagePAN = useSelector(state => state.FormUserSignup.pan)
  

  // form values initial state
  const [formData, setFormData] = useState({
    name: formstageName || "",
    age: formstageAge || "",
    sex: formstageSex || "",
    phone: formstagePhone || "",
    govttype: formstageGovtType || "",
    adhaar: formStageAdhaar || "",
    pan:formStagePAN  || "",
    
  })

  // form values onchange
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  

  // form validation checks
  const [errors, setErrors] = useState({})
  const validate = (formData) => {

    let formErrors = {} // set form errors to none at start

    // name
    if (!formData.name) {
      formErrors.name = "Name required";
    }
    const ageRegex = new RegExp(/^[0-9]*.?[0-9]+$/)
    if(!formData.age || !ageRegex.test(formData.age)){
      formErrors.age = "Invalid Age"
    }
    // if(!formData.sex){
    //   formErrors.sex = "Select Any one";
    // }
    const phoneRegex = new RegExp(/^[6-9]\d{9}$/)
    if(!formData.phone || !phoneRegex.test(formData.phone)){
      formErrors.phone = "Enter a valid Phone number"
    }
    const adhaarRegex = new RegExp(/^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)
    if(!formData.adhaar || !adhaarRegex.test(formData.adhaar)){
      formErrors.adhaar="Enter a Valid Adhaar Number"
    }
    const panRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    if(!formData.pan || !panRegex.test(formData.pan)){
      formErrors.pan="Enter a Valid PAN Number"
    }

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
    if (Object.keys(errors).length === 0 && isSubmitted) { // check if any form errors

      // update Redux Slice
      dispatch(
        formStage(2) // update formStage
      )
      dispatch(
        formSignup({ // update formSignup
          name: formData.name,
          age: formData.age,
          sex:formData.sex,
          phone:formData.phone,
          govttype:formData.govttype,
          adhaar: formData.adhaar,
          pan:formData.pan,
          
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
              
              <input type="text" className="form-control"  id="name"  name="name"  autoComplete="name"  aria-label="name"  aria-required="true"
                placeholder="Name"  value={formData.name}  onChange={handleChange}  />
            </p>
            {errors.name && <span className="error-message">{errors.name}</span>}
    
            <p>
              
              <input   type="text"  id="age"  name="age"  autoComplete="role"  aria-label="role"  aria-required="false"
                placeholder="Age" className="form-control"  value={formData.age}  onChange={handleChange}  />
            </p>
            {errors.age && <span className="error-message">{errors.age}</span>}
            <p>
              <label>Choose Your Gender : </label>
              <select value={formData.sex} onChange={handleChange} name="sex" id="sex">
                <option></option>
                <option> Male</option>
                <option> Female</option>
                <option> Others</option>


              </select>
            </p>
            {errors.sex && <span className="error-message">{errors.sex}</span>}
            <p>
              <label htmlFor="mobile"></label>
              <input   type="tel"  id="phone"  name="phone"  autoComplete="phone"  aria-label="phone"  aria-required="false"
                placeholder="Enter Your Phone Number" className="form-control"  value={formData.phone}  onChange={handleChange}  />
            </p>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
            {/* <p>
              <label>Govt Id type: </label>
              <select name="govttype" id="govttype">
                <option></option>
                <option>Adhaar</option>
                <option>PAN</option>
              </select>
            </p> */}
            <p>
              <input type="tel" name="adhaar" placeholder="Enter Your Adhaar Number" className="form-control"  value={formData.adhaar}  onChange={handleChange}></input>
            </p>
            {errors.adhaar && <span className="error-message">{errors.adhaar}</span>}
            <p>
              <input type="tel" name="pan" placeholder="Enter Your PAN Number" className="form-control"  value={formData.pan}  onChange={handleChange}></input>
            </p>
            {errors.pan && <span className="error-message">{errors.pan}</span>}
            
    
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

export default FormUserSignup;

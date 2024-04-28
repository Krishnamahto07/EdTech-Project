import React from 'react'
import ContactForm from '../common/ContactForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h1>Get in Touch</h1>
      <p>We'd love to here for you , plz fill form  </p>
      <ContactForm />
    </div>
  )
}

export default ContactFormSection

import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/MainProvider";

const EditPage = () => {
  const value = React.useContext(MainContext);
  const { contactToEdit } = value
  const [name,setName] = useState('')
  const [surname,setSurname] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [img, setImg] = useState('')
  const [email, setEmail] = useState('')

  const params = useParams();
  useEffect(() => {
    value.getProductToEdit(params.id);
  }, []);

  useEffect(() => {
    if(contactToEdit){
      setSurname(contactToEdit.surname)
      setName(contactToEdit.name)
      setPhoneNumber(contactToEdit.phoneNumber)
      setImg(contactToEdit.img)
      setEmail((contactToEdit.email))
    }
  },[contactToEdit])

  const navigate = useNavigate()

  const handleSubmit = (ev) => {
    ev.preventDefault()
    let editedContact = {
      name,
      surname,
      phoneNumber,
      img,
      email,
      id: contactToEdit.id,
    };
    value.saveEditedContact(editedContact)
    navigate("/");
  }


  if(!contactToEdit){
    return <h2>|\_/|
         <br/> ( -_-) Loading...</h2>
  }
  return (
    <div className="container edit-add-page">
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <FormControl onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter name" />
        <FormControl onChange={(e) => setSurname(e.target.value)} value={surname} type="text" placeholder="Enter surname" />
        <FormControl onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="number" placeholder="Enter phone number" />
        <FormControl onChange={(e) => setImg(e.target.value)} value={img} src="URL" placeholder="Enter img" />
        <FormControl onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        <Button type='submit'>Save changes</Button>
      </form>
    </div>
  );
};

export default EditPage;

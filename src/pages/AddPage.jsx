import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// ! Создаем состояние
const AddPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [img, setImg] = useState('')
  const [email, setEmail] = useState('')

  // !Чтобы перенаправлять пользователя

  const navigate = useNavigate();

  // ! Получаем данные  с контекста
  const value = React.useContext(MainContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    // !Создаем объект ,для получения данных с инпута
    const newContact = {
      name,
      surname,
      phoneNumber,
      email,
      img,
    };
    // ! Очищаем инпуты
    setName("");
    setSurname("");
    setPhoneNumber("");
    setEmail('')
    setImg('')

    // ! перенаправляем
    // ! -1 назад на одну страницу
    // ! 1 вперед на 1 стр
    navigate("/");

    // ! Передаем в db.json данные с инпута.
    value.addContact(newContact);
  };

  return (
    <div className="container edit-add-page ">
      <h2>Add Page</h2>
      {/* на форму навешиваем onSubmit c функцией */}
      <form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter name"
        />
        <FormControl
          type="text"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
          placeholder="Enter surname"
        />
        <FormControl
          type="number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          placeholder="Enter phone number"
        />
        <FormControl
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter email"
        />
        <FormControl
          src='URL'
          onChange={(e) => setImg(e.target.value)}
          value={img}
          placeholder="Enter image"
        />        <Button type="submit">add</Button>
      </form>
    </div>
  );
};

export default AddPage;

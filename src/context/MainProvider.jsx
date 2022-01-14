// !Всю логику пишем здесь !
import axios from "axios";
import React, { useReducer } from "react";
import { toast } from "react-toastify";
import { API } from "../helpers/const";

// ! Создаем контекст
export const MainContext = React.createContext();

// ! Прописываем изначальное состояние
const INIT_STATE = {
  contacts: null,
  contactToEdit: null,
};

// ! V dispatch передаем action,dispatch за собой вызывает функцию reducer И передаем первым аргументом state,вторым action

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "GET_CONTACTS_TO_EDIT":
      return { ...state, contactToEdit: action.payload };
    default:
      return state;
  }
};

const MainProvider = (props) => {
  // ! Создаем общее состояние
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! Пишем функцию для отправки на сервер
  const addContact = async (newContact) => {
    try {
      await axios.post(API, newContact);
      toast.success('Успешно добавлен')
    } catch (error) {
      console.log(error);
      toast.error('Ошибка попробуйте позже')
    }
  };

  // ! Получить данные с сервера
  const getContacts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_CONTACTS", //! type-указываем название функции
        payload: response.data, //! всегда указвается response.data ,чтобы стянуть объект
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! Удалить данные с сервера
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      // ! Чтобы получить обновленные данные встваляем функцию,получвемую данные с сервера
      getContacts();
      toast.success('Успешно удолён')
    } catch (error) {
      console.log(error);
      toast.error('Ошибка попробуйте позже')
    }
  };

  // ! EDIT
  // ! 1 часть,чтобы стянуть данные и подставить в инпуты

  const getProductToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_CONTACTS_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);

    }
  };

  //! 2 часть сохраняем изменения 
  const saveEditedContact = async (editedContact) => {
    try{ 
        await axios.patch(`${API}/${editedContact.id}`,editedContact)
        getContacts();
        toast.success('Успешно изменён')
    }catch(error){
      console.log(error)
    }
  }

  return (
    //   ! Тут мы передаем value.
    //   ! Provider-проводник
    <MainContext.Provider
      value={{
        addContact,
        getContacts,
        deleteContact,
        getProductToEdit,
        saveEditedContact,
        contacts: state.contacts,
        contactToEdit: state.contactToEdit,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainProvider;

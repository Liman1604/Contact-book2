import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MainContext } from "../context/MainProvider";
import DeleteIcon from "../images/delete.png";

const HomePage = () => {
    //! получаем дочерние элементы,которые мы передали в MainContext.Provider
    // ! useContext-потребитель!
    const value = React.useContext(MainContext);
    useEffect(() => {
        value.getContacts();
        // value.contacts();
        console.log(value);
    }, []);
    if (!value.contacts) {
        return <h2>Lodaing...</h2>;
    }
    return (
        <div>
            <h2>Home Page</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Photo</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {value.contacts.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            <td><img width='50px' src={item.img} alt="" /></td>
                            <td>
                                {/* На кнопку навешиваем событие удаления,скачиваем икноку,импортируем */}
                                <Button onClick={() => value.deleteContact(item.id)}>
                                    <img width="25" src={DeleteIcon} alt="delete-icon" />
                                </Button>
                            </td>
                            <td>
                                <Link to={`/edit/${item.id}`}>
                                    <Button>
                                        <img width='25px' src="https://cdn-icons-png.flaticon.com/512/95/95637.png" alt="" />
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer/>
        </div >
    );
};

export default HomePage;

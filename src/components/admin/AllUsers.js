import { useEffect, useState } from "react";
import { formatDate } from "../../util/FormatDate";
import { Table, Button, Collapse, Card, Image } from "react-bootstrap";
import { AdminToggle } from "./AdminToggle";

function AllUsers() {
    const [ allUsers, setAllUsers ] = useState([]);

    const [ isNull, setIsNull ] = useState(true)
    const [ openStates, setOpenStates ] = useState({});
    const toggleOpen = (orderId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };

    const getAllUsers = () => {
        setIsNull(true);
        fetch(`${process.env.REACT_APP_API_URL}/users/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            setAllUsers(data);
            setIsNull(false);
            console.log(allUsers)
        })
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    const allUsersTable = allUsers.map((user) => (
        <tbody key={user._id}>
            <tr>
                <td className="text-center">{user.img !== null ? <Image src={user.img} width={30} height={30} className="productAdminImage"/> : "No Profile Pic Link"}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdOn)}</td>
                <td className="text-center"><Button
                    onClick={() => toggleOpen(user._id)}
                    aria-controls={`collapse-text-${user._id}`}
                    aria-expanded={openStates[user._id]}>
                    User Details
                </Button>
                </td>
                <td colSpan={2} className="text-center"><AdminToggle user={user._id} isAdmin={user.isAdmin} getAllUsers={getAllUsers}/></td>
            </tr>
            <Collapse in={openStates[user._id]}>
            <tr key={`collapse-${user._id}`} id={`collapse-text-${user._id}`}>
                <td colSpan={6}>
                    <Table>
                        <thead>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Mobile No.</th>
                            <th colSpan={3}>Profile Pic</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.firstName !== undefined ? user.firstName : "None set"} {user.lastName !== undefined ? user.lastName : "None set"}</td>
                                <td>{user.address?.houseNo ?? "None set"} {user.address?.streetName ?? "None set"} {user.address?.city ?? "None set"}</td>
                                <td>{user.mobileNo !== undefined ? user.mobileNo : "None set"}</td>
                                <td colSpan={3}>{user.img !== undefined ? user.img : "None set"}</td>
                            </tr>
                        </tbody>
                    </Table>
                </td>
            </tr>
        </Collapse>
        </tbody>
    ))
    return (
        <Card className="w-xs-50 w-sm-100 mx-3 shadow-lg my-5">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Profile Pic</th>
                        <th>UserId</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th className="text-center">More Details</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                { allUsersTable }
            </Table>
        </Card>
    )
};

export default AllUsers;
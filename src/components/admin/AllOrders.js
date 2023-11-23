
function AllOrders() {
    const [ allOrders, setAllOrders ] = useState([]);

    const [ isNull, setIsNull ] = useState(true)
    const [ openStates, setOpenStates ] = useState({});
    const toggleOpen = (orderId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };

    const getAllOrders = () => {
        setIsNull(true);
        fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            setAllOrders(data);
            setIsNull(false);
            console.log(allUsers)
        })
    }

    useEffect(() => {
        getAllOrders();
    }, [isNull])

    const allOrdersTable = allOrders.map((order) => (
        <tbody key={order._id}>
            <tr>
                <td className="text-center">{order.img !== null ? <Image src={order.img} width={30} height={30} className="productAdminImage"/> : "No Profile Pic Link"}</td>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{formatDate(order.createdOn)}</td>
                <td className="text-center"><Button
                    onClick={() => toggleOpen(order._id)}
                    aria-controls={`collapse-text-${order._id}`}
                    aria-expanded={openStates[order._id]}>
                    order Details
                </Button>
                </td>
                <td colSpan={2} className="text-center"><AdminToggle order={order._id} isAdmin={order.isAdmin} getAllorders={getAllorders}/></td>
            </tr>
            <Collapse in={openStates[order._id]}>
            <tr key={`collapse-${order._id}`} id={`collapse-text-${order._id}`}>
                <td colSpan={6}>
                    <Table>
                        <thead>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Mobile No.</td>
                            <td colSpan={3}>Profile Pic</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.firstName !== undefined ? order.firstName : "None set"} {order.lastName !== undefined ? order.lastName : "None set"}</td>
                                <td>{order.address?.houseNo ?? "None set"} {order.address?.streetName ?? "None set"} {order.address?.city ?? "None set"}</td>
                                <td>{order.mobileNo !== undefined ? order.mobileNo : "None set"}</td>
                                <td colSpan={3}>{order.img !== undefined ? order.img : "None set"}</td>
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
                { allOrdersTable }
            </Table>
        </Card>
    )
};

export default AllOrders;
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TableContainer, TableBody, TableHead, TableRow, TableCell, Table } from "@mui/material";

const UserList = () => {
    const users = useSelector(state => state.users);

    return (
        <div>
            <h3>Users</h3>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                                blogs created
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>
                                    <Link to={`/users/${u.id}`} >{u.name}</Link>
                                </TableCell>
                                <TableCell>
                                    {u.blogs.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;
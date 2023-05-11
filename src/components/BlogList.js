import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TableContainer, TableBody, TableRow, TableCell, Table } from "@mui/material";


const BlogList = () => {
    const sortedBlogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes));

    return(
        <TableContainer>
            <Table>
                <TableBody>
                    {sortedBlogs.map(b => (
                        <TableRow key={b.id}>
                            <TableCell>
                                <Link to={`/blogs/${b.id}`} >{b.title}</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
};

export default BlogList;
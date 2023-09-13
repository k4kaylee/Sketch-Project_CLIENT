import axios from "../../api/axios";


const useUser = () => {
    const loadUsers = async (setUsers) => {
        try {
        const response = await axios.get(`/users`);
        if (response.status === 200) {
            setUsers(response.data);
        }
        } catch (error) {
        console.log(error.message);
        }
    }

    /* const loadUserById = async(id, setUser) => {
        try {
            const response = await axios.get(`/users/${id}`);
            if (response.status === 200) {
            setUser(response.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    } */

    const loadUserStatusById = async(id, setUserStatus) => {
        try {
            console.log(id);
            const response = await axios.get(`/users/${id}`);
            if (response.status === 200) {
            console.log(response.data.status);
            setUserStatus(response.data.status);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        loadUsers,
        /* loadUserById,  */
        loadUserStatusById
    }
}

export default useUser;
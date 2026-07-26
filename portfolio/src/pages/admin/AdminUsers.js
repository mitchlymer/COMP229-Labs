import { useEffect, useState } from "react";
import { apiRequest } from "../../api/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const result = await apiRequest("/users");
                setUsers(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (user) => {
        setEditingId(user.id);

        setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: ""
        });

        setError("");
        setSuccessMessage("");
    };

    const handleDelete = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccessMessage("");

        try {
            await apiRequest(`/users/${userId}`, {
                method: "DELETE"
            });

            setUsers(
                users.filter((user) => user.id !== userId)
            );

            setSuccessMessage("User deleted successfully.");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setError("");
        setSuccessMessage("");

        try {
            if (editingId) {
                const updatedData = {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email
                };

                if (formData.password) {
                    updatedData.password = formData.password;
                }

                await apiRequest(`/users/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify(updatedData)
                });

                setUsers(
                    users.map((user) =>
                        user.id === editingId
                            ? {
                                ...user,
                                firstname: formData.firstname,
                                lastname: formData.lastname,
                                email: formData.email
                            }
                            : user
                    )
                );

                setEditingId(null);
                setSuccessMessage("User updated successfully.");
            } else {
                const result = await apiRequest("/users", {
                    method: "POST",
                    body: JSON.stringify(formData)
                });

                setUsers([...users, result.data]);
                setSuccessMessage("User added successfully.");
            }

            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="admin-page">
            <h1>Manage Users</h1>

            <p className="page-intro">
                Add, view, edit, or delete the users stored in the portfolio
                database.
            </p>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit User" : "Add User"}</h2>

                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        {editingId ? "New Password (Optional)" : "Password"}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!editingId}
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting
                        ? "Saving..."
                        : editingId
                        ? "Update User"
                        : "Add User"}
                </button>
            </form>

            {successMessage && (
                <p className="success-message">{successMessage}</p>
            )}

            {loading && <p>Loading users...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && users.length === 0 && (
                <p>No users were found.</p>
            )}

            {!loading && !error && users.length > 0 && (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.created
                                            ? user.created.substring(0, 10)
                                            : ""}
                                    </td>
                                    <td>
                                        {user.updated
                                            ? user.updated.substring(0, 10)
                                            : ""}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default AdminUsers;
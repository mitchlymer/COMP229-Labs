import { useEffect, useState } from "react";
import { apiRequest } from "../../api/api";

function AdminServices() {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadServices = async () => {
            try {
                const result = await apiRequest("/services");
                setServices(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (service) => {
        setEditingId(service.id);

        setFormData({
            title: service.title,
            description: service.description
        });

        setError("");
        setSuccessMessage("");
    };

    const handleDelete = async (serviceId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccessMessage("");

        try {
            await apiRequest(`/services/${serviceId}`, {
                method: "DELETE"
            });

            setServices(
                services.filter((service) => service.id !== serviceId)
            );

            setSuccessMessage("Service deleted successfully.");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setError("");
        setSuccessMessage("");

        if (editingId) {
            await apiRequest(`/services/${editingId}`, {
                method: "PUT",
                body: JSON.stringify(formData)
            });

            setServices(
                services.map((service) =>
                    service.id === editingId
                        ? {
                            ...service,
                            title: formData.title,
                            description: formData.description
                        }
                        : service
                )
            );

            setEditingId(null);
            setSuccessMessage("Service updated successfully.");
        }
    };

    return (
        <main className="admin-page">
            <h1>Manage Services</h1>

            <p className="page-intro">
                Add, view, edit, or delete the services stored in the portfolio
                database.
            </p>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit Service" : "Add Service"}</h2>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting
                        ? "Saving..."
                        : editingId
                        ? "Update Service"
                        : "Add Service"}
                </button>
            </form>

            {successMessage && (
                <p className="success-message">{successMessage}</p>
            )}

            {loading && <p>Loading services...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && services.length === 0 && (
                <p>No services were found.</p>
            )}

            {!loading && !error && services.length > 0 && (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.title}</td>
                                    <td>{service.description}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(service)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(service.id)}
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

export default AdminServices;